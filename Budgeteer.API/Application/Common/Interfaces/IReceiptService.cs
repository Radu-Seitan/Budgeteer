using Budgeteer.Application.Common.DTOs;
using Budgeteer.Domain.Entities;
using Microsoft.AspNetCore.Http;

namespace Budgeteer.Application.Common.Interfaces
{
    public interface IReceiptService
    {
        public Task<List<CategorizedProductsDto>> ScanReceipt(List<Category> categories, IFormFile image);
        public Task<Cart> SaveCart(CartCreateDto cartDto);
    }
}
