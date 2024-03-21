using Budgeteer.Application.Common.Interfaces;
using Budgeteer.Domain.Entities;
using Budgeteer.Infrastructure.Persistence;

namespace Budgeteer.Infrastructure.Repositories
{
    public class AppImageRepository(AppDbContext context) : IAppImageRepository
    {
        public async Task<AppImage> UploadImage(byte[] content, string type, int storeId)
        {
            var appImage = new AppImage
            {
                Content = content,
                Type = type,
                StoreId = storeId
            };

            context.Images.Add(appImage);
            await context.SaveChangesAsync();
            return appImage;
        }

        public async Task DeleteImage(Guid imageId)
        {
            var image = await context.Images.FindAsync(imageId);
            context.Images.Remove(image);
            await context.SaveChangesAsync();
        }

        public async Task<AppImage> GetImage(Guid imageId)
        {
            var image = await context.Images.FindAsync(imageId);
            return image;
        }
    }
}
