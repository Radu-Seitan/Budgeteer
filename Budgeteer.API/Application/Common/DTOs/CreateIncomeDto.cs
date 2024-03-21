using Budgeteer.Domain.Enums;

namespace Budgeteer.Application.Common.DTOs
{
    public class CreateIncomeDto
    {
        public double Quantity { get; set; }
        public IncomeCategory Category { get; set; }
    }
}
