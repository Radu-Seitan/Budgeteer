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
    [Route("api/categories")]
    [ApiController]
    [Authorize]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoriesService;

        public CategoriesController(ICategoryService categoriesService)
        {
            _categoriesService = categoriesService;
        }

        [HttpGet("with-products")]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
        {
            var categories = await _categoriesService.GetCategoriesAsync();

            return Ok(categories);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDisplayDto>>> Categories()
        {
            var categories = await _categoriesService.CategoriesAsync();

            return Ok(categories);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> GetCategory(int id)
        {
            var category = await _categoriesService.GetByIdAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        [HttpPost]
        public async Task<ActionResult<Category>> CreateCategory([FromBody] CategoryCreateDto category)
        {
            var createdCategory = await _categoriesService.CreateCategoryAsync(category);

            return Ok(createdCategory);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Category>> UpdateCategory(int id, [FromBody] CategoryUpdateDto category)
        {
            if (category.Name.IsNullOrEmpty())
            {
                return BadRequest("Missing category name");
            }

            try
            {
                var updatedCategory = await _categoriesService.UpdateAsync(id, category);

                return Ok(updatedCategory);

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

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            await _categoriesService.DeleteByIdAsync(id);

            return Ok();
        }

        [HttpGet("spending")]
        public async Task<IActionResult> GetCategoriesSpending([FromQuery] DateTime? dateFrom, [FromQuery] DateTime? dateTo)
        {
            var categoriesSpending = await _categoriesService.GetCategoriesSpendingAsync(dateFrom, dateTo);

            return Ok(JsonConvert.SerializeObject(categoriesSpending));
        }
    }
}
