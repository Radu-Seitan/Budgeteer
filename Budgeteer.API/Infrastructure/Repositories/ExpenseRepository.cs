using Budgeteer.Application.Common.DTOs;
using Budgeteer.Application.Common.Interfaces;
using Budgeteer.Domain.Entities;
using Budgeteer.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Budgeteer.Infrastructure.Repositories
{
    public class ExpenseRepository(AppDbContext context) : IExpenseRepository
    {
        public async Task Save(Expense expense)
        {
            await context.Expenses.AddAsync(expense);
            await context.SaveChangesAsync();
        }

        public async Task AddRange(IEnumerable<Expense> expenses)
        {
            await context.AddRangeAsync(expenses);
            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Expense>> GetAll(GetExpensesDto request, string? userId = null)
        {
            var expenses = context.Expenses.AsNoTracking();

            if (!string.IsNullOrEmpty(userId))
            {
                expenses = expenses.Where(x => x.UserId.ToString() == userId);
            }

            if (request.Category.HasValue)
            {
                expenses = expenses.Where(x => x.Category == request.Category.Value);
            }

            if (request.StoreId.HasValue)
            {
                expenses = expenses.Where(x => x.StoreId == request.StoreId.Value);
            }

            return await expenses.ToListAsync();
        }
    }
}
