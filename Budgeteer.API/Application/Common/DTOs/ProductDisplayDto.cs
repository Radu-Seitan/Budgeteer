namespace Budgeteer.Application.Common.DTOs
{
    public class ProductDisplayDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<string> Categories { get; set; }
    }
}
