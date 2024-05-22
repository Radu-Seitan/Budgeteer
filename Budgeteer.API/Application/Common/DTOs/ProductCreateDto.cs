namespace Budgeteer.Application.Common.DTOs
{
    public class ProductCreateDto
    {
        public string Name { get; set; }
        public IEnumerable<int> Categories { get; set; }
    }
}
