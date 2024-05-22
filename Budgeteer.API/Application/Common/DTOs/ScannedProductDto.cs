using System.Text.Json.Serialization;

namespace Budgeteer.Application.Common.DTOs
{
    public class ScannedProductDto
    {
        [JsonPropertyName("nume produs")]
        public string Name { get; set; }

        [JsonPropertyName("cantitate")]
        public int Quantity { get; set; }

        [JsonPropertyName("pret")]
        public double Price { get; set; }
    }
}
