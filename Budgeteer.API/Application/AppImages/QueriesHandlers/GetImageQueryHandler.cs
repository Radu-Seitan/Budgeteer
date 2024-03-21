using Budgeteer.Application.Common.Interfaces;
using Budgeteer.Domain.Entities;
using FluentValidation;
using MediatR;

namespace Budgeteer.Application.AppImages.QueriesHandlers
{
    public class GetImageQuery : IRequest<AppImage>
    {
        public Guid ImageId { get; set; }
    }

    public class GetImageQueryHandler(
        IAppImageRepository appImageRepository) : IRequestHandler<GetImageQuery, AppImage>
    {
        public async Task<AppImage> Handle(GetImageQuery request, CancellationToken cancellationToken)
        {
            var image = await appImageRepository.GetImage(request.ImageId);
            return image;
        }
    }
    public class GetImageQueryValidator : AbstractValidator<GetImageQuery>
    {
        public GetImageQueryValidator()
        {
            RuleFor(i => i.ImageId).NotNull();
        }
    }
}
