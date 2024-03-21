using AutoMapper;
using Budgeteer.Application.Common.DTOs;
using Budgeteer.Application.Common.Interfaces;
using MediatR;

namespace Budgeteer.Application.Expenses.QueriesHandlers
{
    public class GetExpensesQuery : IRequest<IEnumerable<ExpenseDto>>
    {
        public GetExpensesDto GetExpenses { get; set; }
    }

    public class GetExpensesQueryHandler : IRequestHandler<GetExpensesQuery, IEnumerable<ExpenseDto>>
    {
        private readonly IMapper _mapper;
        private readonly IExpenseRepository _expenseRepository;

        public GetExpensesQueryHandler(
            IMapper mapper,
            IExpenseRepository expenseRepository)
        {
            _mapper = mapper;
            _expenseRepository = expenseRepository;
        }

        public async Task<IEnumerable<ExpenseDto>> Handle(GetExpensesQuery request, CancellationToken cancellationToken)
        {
            var expenses = await _expenseRepository.GetAll(request.GetExpenses);

            return _mapper.Map<IEnumerable<ExpenseDto>>(expenses);
        }
    }
}
