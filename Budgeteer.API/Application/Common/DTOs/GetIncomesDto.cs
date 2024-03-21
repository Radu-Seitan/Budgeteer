using Budgeteer.Domain.Enums;

namespace Budgeteer.Application.Common.DTOs
{
    public class GetIncomesDto
    {
        public IncomeCategory? Category { get; set; }
    }
}
