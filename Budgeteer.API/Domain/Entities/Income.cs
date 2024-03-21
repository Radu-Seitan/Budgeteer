using Budgeteer.Domain.Enums;

namespace Budgeteer.Domain.Entities
{
    public class Income : BaseEntity
    {
        public double Quantity { get; set; }
        public IncomeCategory Category { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}
