using Budgeteer.Domain.Enums;

namespace Budgeteer.Application.Common.DTOs
{
    public class GetExpensesDto
    {
        public ExpenseCategory? Category { get; set; }
        public int? StoreId { get; set; }
    }
}
