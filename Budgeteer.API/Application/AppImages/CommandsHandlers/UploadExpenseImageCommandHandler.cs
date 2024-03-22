using MediatR;

namespace Budgeteer.Application.AppImages.CommandsHandlers
{
    public class UploadExpenseImageCommand : IRequest<Unit>
    {
        public byte[] Content { get; set; }
        public string Type { get; set; }
    }

    public class UploadExpenseImageCommandHandler : IRequestHandler<UploadExpenseImageCommand, Unit>
    {
        public Task<Unit> Handle(UploadExpenseImageCommand request, CancellationToken cancellationToken)
        {
            //TODO add logic to send photo to python project 
            throw new NotImplementedException();
        }
    }
}
