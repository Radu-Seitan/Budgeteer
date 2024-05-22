namespace Budgeteer.Application.Common.DTOs
{
    public class CategorizedProductsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<ScannedProductDto> Products { get; set; }
    }
}
