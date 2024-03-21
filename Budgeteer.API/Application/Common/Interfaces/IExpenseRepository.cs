using Budgeteer.Application.Common.DTOs;
using Budgeteer.Domain.Entities;

namespace Budgeteer.Application.Common.Interfaces
{
    public interface IExpenseRepository
    {
        Task Save(Expense expense);
        Task<IEnumerable<Expense>> GetAll(GetExpensesDto request);
    }
}
