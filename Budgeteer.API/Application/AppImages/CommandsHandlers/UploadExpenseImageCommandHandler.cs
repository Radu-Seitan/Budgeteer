using Budgeteer.Application.Common.Interfaces;
using MediatR;

namespace Budgeteer.Application.AppImages.CommandsHandlers
{
    public class UploadExpenseImageCommand : IRequest<Guid>
    {
        public byte[] Content { get; set; }
        public string Type { get; set; }
    }

    public class UploadExpenseImageCommandHandler(IAppImageRepository appImageRepository) : IRequestHandler<UploadExpenseImageCommand, Guid>
    {
        public async Task<Guid> Handle(UploadExpenseImageCommand request, CancellationToken cancellationToken)
        {
            var image = await appImageRepository.UploadImage(request.Content, request.Type);

            return image.Id;
        }
    }
}
