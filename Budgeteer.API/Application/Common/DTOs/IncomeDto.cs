using Budgeteer.Domain.Enums;

namespace Budgeteer.Application.Common.DTOs
{
    public class IncomeDto
    {
        public int Id { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public double Quantity { get; set; }
        public IncomeCategory Category { get; set; }
        public string UserId { get; set; }
    }
}
