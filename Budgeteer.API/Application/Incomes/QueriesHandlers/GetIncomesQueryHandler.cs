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

    public class GetExpensesQueryHandler(
        IIncomeRepository incomeRepository,
        ICurrentUserService currentUserService,
        IMapper mapper) : IRequestHandler<GetIncomesQuery, IEnumerable<IncomeDto>>
    {
        public async Task<IEnumerable<IncomeDto>> Handle(GetIncomesQuery request, CancellationToken cancellationToken)
        {
            var currentUserId = currentUserService.UserId;
            var expenses = await incomeRepository.GetAll(request.GetIncomes, currentUserId);

            return mapper.Map<IEnumerable<IncomeDto>>(expenses);
        }
    }
}
