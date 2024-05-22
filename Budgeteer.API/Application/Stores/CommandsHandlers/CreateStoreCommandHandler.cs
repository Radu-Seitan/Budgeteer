using Budgeteer.Application.Common.Interfaces;
using Budgeteer.Domain.Entities;
using MediatR;

namespace Budgeteer.Application.Stores.CommandsHandlers
{
    public class CreateStoreCommand : IRequest<Unit>
    {
        public string Name { get; set; }

        public Guid? ImageId { get; set; }
    }

    public class CreateStoreCommandHandler(
        IStoreRepository storeRepository) : IRequestHandler<CreateStoreCommand, Unit>
    {
        public async Task<Unit> Handle(CreateStoreCommand request, CancellationToken cancellationToken)
        {
            var store = new Store
            {
                Name = request.Name,
                ImageId = request.ImageId,
                Expenses = []
            };

            await storeRepository.Save(store);

            return Unit.Value;
        }
    }
}
