using Budgeteer.Application.Common.Interfaces;
using Budgeteer.Domain.Entities;
using Budgeteer.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Budgeteer.Infrastructure.Repositories
{
    public class StoreRepository(AppDbContext context) : IStoreRepository
    {
        public async Task Save(Store store)
        {
            await context.Stores.AddAsync(store);
            await context.SaveChangesAsync();
        }

        public async Task<Store?> GetById(int id)
        {
            return await context.Stores.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<Store>> GetAll()
        {
            return await context.Stores.AsNoTracking().ToListAsync();
        }

        public async Task UploadStoreImage(int storeId, Guid? imageId)
        {
            var store = await GetById(storeId);

            store.ImageId = imageId;

            context.Update(store);
            await context.SaveChangesAsync();
        }
    }
}
