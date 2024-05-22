using Budgeteer.Application.Common.DTOs;
using Budgeteer.Application.Common.Exceptions;
using Budgeteer.Application.Common.Interfaces;
using Budgeteer.Domain.Entities;
using Budgeteer.Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using System.Net.Http.Headers;

namespace Budgeteer.Application.Services
{
    public class ReceiptService : IReceiptService
    {
        private readonly string OCRURL = "http://localhost:8000";
        private const string ChatGptUrl = "http://localhost:55124";
        private readonly IRepository<Product> _productRepository;
        private readonly IRepository<Cart> _cartRepository;
        private readonly IRepository<Category> _categoriesRepository;
        private readonly ICurrentUserService _currentUserService;
        private readonly IExpenseRepository _expenseRepository;
        private readonly UserManager<User> _userManager;

        public ReceiptService(IRepository<Product> productRepository,
            IRepository<Cart> cartRepository,
            IRepository<Category> categoriesRepository,
            ICurrentUserService currentUserService,
            IExpenseRepository expenseRepository,
            UserManager<User> userManager)
        {
            _productRepository = productRepository;
            _cartRepository = cartRepository;
            _categoriesRepository = categoriesRepository;
            _currentUserService = currentUserService;
            _expenseRepository = expenseRepository;
            _userManager = userManager;
        }

        public async Task<List<CategorizedProductsDto>> ScanReceipt(List<Category> categories, IFormFile image)
        {
            var imageOcr = await GetImageOcr(image);
            var categorizedProducts = await GetCategorizedProducts(categories, imageOcr);

            var deserializedCategoriesProducts = JsonConvert.DeserializeObject<string>(categorizedProducts);
            var categoriesProducts = JsonConvert.DeserializeObject<Dictionary<string, List<ScannedProductDto>>>(deserializedCategoriesProducts);

            var categorizedProductsDto = new List<CategorizedProductsDto>();

            foreach (var category in categoriesProducts)
            {
                var products = category.Value.DistinctBy(p => new { p.Name, p.Price }).ToList();

                foreach (var product in products)
                {
                    product.Quantity = category.Value.Where(p => p.Name == product.Name && p.Price == product.Price).Sum(p => p.Quantity);
                }

                categorizedProductsDto.Add(new CategorizedProductsDto
                {
                    Id = categories.First(c => c.Name == category.Key).Id,
                    Name = category.Key,
                    Products = products
                });
            }

            return categorizedProductsDto;
        }

        public async Task<Cart> SaveCart(CartCreateDto cartDto)
        {
            var repoProducts = await _productRepository.GetAllAsync();

            var cart = new Cart
            {
                Date = cartDto.Date,
            };

            var cartProducts = new List<CartProduct>();

            foreach (var categoryProducts in cartDto.CategoryProducts)
            {
                var category = await _categoriesRepository.FindByIdAsync(categoryProducts.Id);

                if (category == null)
                {
                    throw new NotFoundException($"Entity of type {nameof(Category)} not found");
                }

                cartProducts.AddRange(await AddProducts(category, categoryProducts.Products, repoProducts.ToList()));
            }

            cart.CartProducts = cartProducts;

            await _cartRepository.PostAsync(cart);

            //create an expense when saving cart

            var totalSum = cartProducts.Sum(p => p.Price);
            var expense = new Expense
            {
                Quantity = totalSum,
                Category = ExpenseCategory.Shopping,
                StoreId = null
            };

            var currentUserId = _currentUserService.UserId;
            expense.UserId = Guid.Parse(currentUserId);

            await _expenseRepository.Save(expense);

            //decrease income sum for user
            var user = await _userManager.FindByIdAsync(currentUserId);
            user.Sum -= totalSum;
            await _userManager.UpdateAsync(user);

            return cart;
        }

        #region Private methods

        private async Task<string> GetImageOcr(IFormFile image)
        {
            var imageOcr = string.Empty;

            using var ms = new MemoryStream();
            await image.CopyToAsync(ms);
            var bytes = ms.ToArray();

            HttpClient client = new HttpClient();
            var uri = new Uri(OCRURL);
            client.BaseAddress = uri;
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var content = new MultipartFormDataContent();
            content.Add(new ByteArrayContent(bytes), "image", "image.jpg");

            var response = client.PostAsync(uri, content).Result;

            if (response.IsSuccessStatusCode)
            {
                imageOcr = await response.Content.ReadAsStringAsync();
            }

            await ms.DisposeAsync();
            client.Dispose();

            return imageOcr;
        }

        private async Task<string> GetCategorizedProducts(List<Category> categories, string imageOcr)
        {
            var categorizedProducts = string.Empty;

            HttpClient client = new HttpClient();
            var uri = new Uri(ChatGptUrl);
            client.BaseAddress = uri;
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var content = new MultipartFormDataContent();
            content.Add(new StringContent(imageOcr), "ocr");
            content.Add(new StringContent(JsonConvert.SerializeObject(categories.Select(c => c.Name))), "categories");

            var response = client.PostAsync(uri, content).Result;

            if (response.IsSuccessStatusCode)
            {
                categorizedProducts = await response.Content.ReadAsStringAsync();
            }

            client.Dispose();

            return categorizedProducts;
        }

        private async Task<List<CartProduct>> AddProducts(Category category, List<ScannedProductDto> scannedProducts, List<Product> repoProducts)
        {
            var cartProducts = new List<CartProduct>();

            foreach (var scannedProduct in scannedProducts)
            {
                var repoProduct = repoProducts.Find(p => p.Name == scannedProduct.Name);

                if (repoProduct == null)
                {
                    var product = new Product
                    {
                        Name = scannedProduct.Name,
                        Categories = new List<Category> { category }
                    };

                    await _productRepository.PostAsync(product);

                    var cartProduct = new CartProduct
                    {
                        Product = product,
                        Quantity = scannedProduct.Quantity,
                        Price = scannedProduct.Price,
                    };

                    cartProducts.Add(cartProduct);
                }
                else
                {
                    if (!repoProduct.Categories.Contains(category))
                    {
                        repoProduct.Categories.Add(category);

                        await _productRepository.UpdateAsync(repoProduct);
                    }

                    var cartProduct = new CartProduct
                    {
                        Product = repoProduct,
                        Quantity = scannedProduct.Quantity,
                        Price = scannedProduct.Price,
                    };

                    cartProducts.Add(cartProduct);
                }
            }

            return cartProducts;
        }

        #endregion
    }
}
