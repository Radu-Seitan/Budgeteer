using Budgeteer.Domain.Entities;

namespace Budgeteer.Application.Common.Interfaces
{
    public interface IAppImageRepository
    {
        Task<AppImage> UploadImage(byte[] content, string type, int storeId);

        Task<AppImage> UploadImage(byte[] content, string type);

        Task DeleteImage(Guid imageId);

        Task<AppImage> GetImage(Guid imageId);
    }
}
