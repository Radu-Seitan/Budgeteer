using Budgeteer.Domain.Entities;

namespace Budgeteer.Application.Common.Interfaces
{
    public interface IStoreRepository
    {
        Task Save(Store store);
        Task<Store?> GetById(int id);
        Task<IEnumerable<Store>> GetAll();
        Task UploadStoreImage(int storeId, Guid? imageId);
    }
}
