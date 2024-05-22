namespace Budgeteer.Application.Common.DTOs
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<ProductDto> Products { get; set; }
    }
}
