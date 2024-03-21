using Budgeteer.Application.Common.DTOs;
using Budgeteer.Application.Common.Interfaces;
using Budgeteer.Domain.Entities;
using Budgeteer.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Budgeteer.Infrastructure.Repositories
{
    public class IncomeRepository : IIncomeRepository
    {
        private readonly AppDbContext _context;

        public IncomeRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task Save(Income income)
        {
            await _context.Incomes.AddAsync(income);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Income>> GetAll(GetIncomesDto request)
        {
            var incomes = _context.Incomes.AsNoTracking();

            if (!string.IsNullOrEmpty(request.UserId))
            {
                incomes = incomes.Where(x => x.UserId == request.UserId);
            }

            if (request.Category.HasValue)
            {
                incomes = incomes.Where(x => x.Category == request.Category.Value);
            }

            return await incomes.ToListAsync();
        }
    }
}
