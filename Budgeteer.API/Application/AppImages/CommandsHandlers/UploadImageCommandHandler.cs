using Budgeteer.Application.Common.Interfaces;
using MediatR;

namespace Budgeteer.Application.AppImages.CommandsHandlers
{
    public class UploadImageCommand : IRequest<Guid>
    {
        public byte[] Content { get; set; }
        public string Type { get; set; }
        public int StoreId { get; set; }
    }

    public class UploadImageCommandHandler(
        IAppImageRepository appImageRepository,
        IStoreRepository storeRepository) : IRequestHandler<UploadImageCommand, Guid>
    {
        public async Task<Guid> Handle(UploadImageCommand request, CancellationToken cancellationToken)
        {
            var image = await appImageRepository.UploadImage(request.Content, request.Type, request.StoreId);

            await storeRepository.UploadStoreImage(request.StoreId, image.Id);

            return image.Id;
        }
    }
}
