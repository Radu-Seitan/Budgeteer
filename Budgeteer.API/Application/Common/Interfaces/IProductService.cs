using Budgeteer.Application.Common.DTOs;

namespace Budgeteer.Application.Common.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<ProductDisplayDto>> GetProductsAsync();
        Task<ProductDisplayDto> CreateProductAsync(ProductCreateDto productDto);
        Task<ProductDisplayDto?> GetByIdAsync(int id);
    }
}
