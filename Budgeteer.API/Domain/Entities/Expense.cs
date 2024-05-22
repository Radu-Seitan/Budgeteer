using Budgeteer.Domain.Enums;

namespace Budgeteer.Domain.Entities
{
    public class Expense : BaseEntity
    {
        public double Quantity { get; set; }
        public ExpenseCategory Category { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public int? StoreId { get; set; }
        public Store Store { get; set; }
    }
}
