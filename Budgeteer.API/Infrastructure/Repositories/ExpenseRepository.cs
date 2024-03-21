using Budgeteer.Application.Common.DTOs;
using Budgeteer.Application.Common.Interfaces;
using Budgeteer.Domain.Entities;
using Budgeteer.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Budgeteer.Infrastructure.Repositories
{
    public class ExpenseRepository : IExpenseRepository
    {
        private readonly AppDbContext _context;

        public ExpenseRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task Save(Expense expense)
        {
            await _context.Expenses.AddAsync(expense);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Expense>> GetAll(GetExpensesDto request)
        {
            var expenses = _context.Expenses.AsNoTracking();

            if (!string.IsNullOrEmpty(request.UserId))
            {
                expenses = expenses.Where(x => x.UserId == request.UserId);
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
