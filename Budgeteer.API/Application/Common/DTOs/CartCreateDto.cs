namespace Budgeteer.Application.Common.DTOs
{
    public class CartCreateDto
    {
        public DateTime Date { get; set; }
        public List<CategorizedProductsDto> CategoryProducts { get; set; }
    }
}
