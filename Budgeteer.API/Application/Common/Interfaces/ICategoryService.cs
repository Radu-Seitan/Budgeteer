using Budgeteer.Application.Common.DTOs;
using Budgeteer.Domain.Entities;

namespace Budgeteer.Application.Common.Interfaces
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryDto>> GetCategoriesAsync();
        Task<IEnumerable<CategoryDisplayDto>> CategoriesAsync();
        Task<Category> CreateCategoryAsync(CategoryCreateDto categoryDto);
        Task<CategoryDto?> GetByIdAsync(int id);
        Task<Category> UpdateAsync(int id, CategoryUpdateDto categoryDto);
        Task DeleteByIdAsync(int id);
        Task<List<CategorySpendingDto>> GetCategoriesSpendingAsync(DateTime? dateFrom, DateTime? dateTo);
    }
}
