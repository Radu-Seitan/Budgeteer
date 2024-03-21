using Budgeteer.Domain.Enums;

namespace Budgeteer.Application.Common.DTOs
{
    public class CreateExpenseDto
    {
        public double Quantity { get; set; }
        public ExpenseCategory Category { get; set; }
        public int StoreId { get; set; }
    }
}
