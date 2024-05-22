using Budgeteer.Domain.Entities;
using Budgeteer.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Budgeteer.Infrastructure.Repositories
{
    public class ProductRepository : BaseRepository<Product>
    {
        public ProductRepository(AppDbContext context) : base(context)
        {
        }

        public override async Task<IEnumerable<Product>> GetAllAsync()
        {
            try
            {
                return await _context.Products.Include(p => p.Categories).ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error when retrieving data from DB: {ex.Message}", ex);
            }
        }

        public override async Task<Product?> FindByIdAsync(int id)
        {
            try
            {
                return await _context.Products.Include(p => p.Categories).FirstOrDefaultAsync(c => c.Id == id);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error when retrieving entity by id {id}, {ex.Message}", ex);
            }
        }
    }
}
