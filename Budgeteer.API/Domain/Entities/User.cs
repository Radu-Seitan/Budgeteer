using Microsoft.AspNetCore.Identity;

namespace Budgeteer.Domain.Entities
{
    public class User : IdentityUser<Guid>
    {
        public double Sum { get; set; }
        public List<Income> Incomes { get; set; }
        public List<Expense> Expenses { get; set; }
    }
}