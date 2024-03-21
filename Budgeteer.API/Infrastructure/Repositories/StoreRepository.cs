using Budgeteer.Application.Common.Interfaces;
using Budgeteer.Domain.Entities;
using Budgeteer.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Budgeteer.Infrastructure.Repositories
{
    public class StoreRepository : IStoreRepository
    {
        private readonly AppDbContext _context;

        public StoreRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task Save(Store store)
        {
            await _context.Stores.AddAsync(store);
            await _context.SaveChangesAsync();
        }

        public async Task<Store?> GetById(int id)
        {
            return await _context.Stores.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<Store>> GetAll()
        {
            return await _context.Stores.AsNoTracking().ToListAsync();
        }
    }
}
