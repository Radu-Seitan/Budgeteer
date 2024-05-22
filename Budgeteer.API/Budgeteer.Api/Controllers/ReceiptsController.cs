using Budgeteer.Application.Common.DTOs;
using Budgeteer.Application.Common.Exceptions;
using Budgeteer.Application.Common.Interfaces;
using Budgeteer.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace Budgeteer.Api.Controllers
{
    [Route("api/receipts")]
    [ApiController]
    [Authorize]
    public class ReceiptsController : ControllerBase
    {
        private readonly IReceiptService _receiptsService;

        public ReceiptsController(IReceiptService receiptsService)
        {
            _receiptsService = receiptsService;
        }

        [HttpPost("scan")]
        public async Task<ActionResult<string>> ScanReceipt([FromForm] string categories, [FromForm] IFormFile image)
        {
            List<Category> categoriesList = JsonConvert.DeserializeObject<List<Category>>(categories) ?? new List<Category>();

            if (categoriesList.IsNullOrEmpty() || image.Length <= 0)
            {
                return BadRequest();
            }

            var categorizedProductsDto = await _receiptsService.ScanReceipt(categoriesList, image);

            return Ok(JsonConvert.SerializeObject(categorizedProductsDto));
        }

        [HttpPost("scan-and-save")]
        public async Task<ActionResult<string>> ScanReceiptAndSave([FromForm] string categories, [FromForm] IFormFile image)
        {
            List<Category> categoriesList = JsonConvert.DeserializeObject<List<Category>>(categories) ?? new List<Category>();

            if (categoriesList.IsNullOrEmpty() || image.Length <= 0)
            {
                return BadRequest();
            }

            var cart = await _receiptsService.ScanAndSaveReceipt(categoriesList, image);

            return Ok(cart);
        }

        [HttpPost("cart")]
        public async Task<ActionResult<Cart>> SaveCart([FromBody] CartCreateDto cart)
        {
            try
            {
                if (cart.CategoryProducts.IsNullOrEmpty())
                {
                    return BadRequest();
                }

                var createdCart = await _receiptsService.SaveCart(cart);

                return Ok(cart);
            }
            catch (NotFoundException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}
