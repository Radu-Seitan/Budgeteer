using Budgeteer.Domain.Enums;

namespace Budgeteer.Application.Common.DTOs
{
    public class GetIncomesDto
    {
        public string? UserId { get; set; }
        public IncomeCategory? Category { get; set; }
    }
}
