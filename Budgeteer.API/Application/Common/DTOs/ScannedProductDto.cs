using Newtonsoft.Json;

namespace Budgeteer.Application.Common.DTOs
{
    public class ScannedProductDto
    {
        [JsonProperty("nume produs")]
        public string Name { get; set; }

        [JsonProperty("cantitate")]
        public int Quantity { get; set; }

        [JsonProperty("pret")]
        public double Price { get; set; }
    }
}
