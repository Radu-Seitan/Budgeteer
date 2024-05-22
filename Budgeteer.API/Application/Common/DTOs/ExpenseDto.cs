using Budgeteer.Domain.Enums;

namespace Budgeteer.Application.Common.DTOs
{
    public class ExpenseDto
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public double Quantity { get; set; }
        public ExpenseCategory Category { get; set; }
        public string UserId { get; set; }
        public int? StoreId { get; set; }
    }
}
