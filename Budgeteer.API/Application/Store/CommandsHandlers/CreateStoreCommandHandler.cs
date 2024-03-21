using Budgeteer.Application.Common.Interfaces;
using Budgeteer.Domain.Entities;
using MediatR;

namespace Budgeteer.Application.Store.CommandsHandlers
{
    public class CreateStoreCommand : IRequest<Unit>
    {
        public string Name { get; set; }
    }

    public class CreateStoreCommandHandler : IRequestHandler<CreateStoreCommand, Unit>
    {
        private readonly IStoreRepository _storeRepository;

        public CreateStoreCommandHandler(IStoreRepository storeRepository)
        {
            _storeRepository = storeRepository;
        }

        public async Task<Unit> Handle(CreateStoreCommand request, CancellationToken cancellationToken)
        {
            var store = new Domain.Entities.Store
            {
                Name = request.Name,
                Expenses = []
            };

            await _storeRepository.Save(store);
        }
    }
}
