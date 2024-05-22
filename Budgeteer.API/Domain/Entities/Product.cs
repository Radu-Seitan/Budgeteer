using System.Text.Json.Serialization;

namespace Budgeteer.Domain.Entities
{
    public class Product
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        [JsonIgnore]
        public ICollection<Category> Categories { get; set; } = new HashSet<Category>();

        public ICollection<CartProduct> CartProducts { get; set; } = new HashSet<CartProduct>();
    }
}
