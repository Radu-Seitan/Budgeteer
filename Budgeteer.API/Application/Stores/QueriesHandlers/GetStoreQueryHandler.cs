using AutoMapper;
using Budgeteer.Application.Common.DTOs;
using Budgeteer.Application.Common.Interfaces;
using MediatR;

namespace Budgeteer.Application.Stores.QueriesHandlers
{
    public class GetStoreQuery : IRequest<StoreDto>
    {
        public int StoreId { get; set; }
    }

    public class GetStoreQueryHandler(
        IStoreRepository storeRepository,
        IMapper mapper) : IRequestHandler<GetStoreQuery, StoreDto>
    {
        public async Task<StoreDto> Handle(GetStoreQuery request, CancellationToken cancellationToken)
        {
            var store = await storeRepository.GetById(request.StoreId);

            if (store == null) { return new StoreDto(); }

            return mapper.Map<StoreDto>(store);
        }
    }
}
