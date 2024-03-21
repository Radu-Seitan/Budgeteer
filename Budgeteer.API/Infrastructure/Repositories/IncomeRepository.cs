using Budgeteer.Application.Common.DTOs;
using Budgeteer.Application.Common.Interfaces;
using Budgeteer.Domain.Entities;
using Budgeteer.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Budgeteer.Infrastructure.Repositories
{
    public class IncomeRepository(AppDbContext context) : IIncomeRepository
    {
        public async Task Save(Income income)
        {
            await context.Incomes.AddAsync(income);
            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Income>> GetAll(GetIncomesDto request, string? userId = null)
        {
            var incomes = context.Incomes.AsNoTracking();

            if (!string.IsNullOrEmpty(userId))
            {
                incomes = incomes.Where(x => x.UserId.ToString() == userId);
            }

            if (request.Category.HasValue)
            {
                incomes = incomes.Where(x => x.Category == request.Category.Value);
            }

            return await incomes.ToListAsync();
        }
    }
}
