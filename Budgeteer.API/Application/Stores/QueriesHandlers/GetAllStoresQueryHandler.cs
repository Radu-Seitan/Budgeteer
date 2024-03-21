using AutoMapper;
using Budgeteer.Application.Common.DTOs;
using Budgeteer.Application.Common.Interfaces;
using MediatR;

namespace Budgeteer.Application.Stores.QueriesHandlers
{
    public class GetAllStoresQuery : IRequest<IEnumerable<StoreDto>>
    {
    }

    public class GetAllStoresQueryHandler(
        IStoreRepository storeRepository,
        IMapper mapper) : IRequestHandler<GetAllStoresQuery, IEnumerable<StoreDto>>
    {
        public async Task<IEnumerable<StoreDto>> Handle(GetAllStoresQuery request, CancellationToken cancellationToken)
        {
            var stores = await storeRepository.GetAll();

            return mapper.Map<IEnumerable<StoreDto>>(stores);
        }
    }
}
