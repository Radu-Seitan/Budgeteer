using AutoMapper;
using Budgeteer.Application.Common.DTOs;
using Budgeteer.Application.Common.Interfaces;
using MediatR;

namespace Budgeteer.Application.Incomes.QueriesHandlers
{
    public class GetIncomesQuery : IRequest<IEnumerable<IncomeDto>>
    {
        public GetIncomesDto GetIncomes { get; set; }
    }

    public class GetExpensesQueryHandler : IRequestHandler<GetIncomesQuery, IEnumerable<IncomeDto>>
    {
        private readonly IMapper _mapper;
        private readonly IIncomeRepository _incomeRepository;

        public GetExpensesQueryHandler(
            IMapper mapper,
            IIncomeRepository incomeRepository)
        {
            _mapper = mapper;
            _incomeRepository = incomeRepository;
        }

        public async Task<IEnumerable<IncomeDto>> Handle(GetIncomesQuery request, CancellationToken cancellationToken)
        {
            var expenses = await _incomeRepository.GetAll(request.GetIncomes);

            return _mapper.Map<IEnumerable<IncomeDto>>(expenses);
        }
    }
}
