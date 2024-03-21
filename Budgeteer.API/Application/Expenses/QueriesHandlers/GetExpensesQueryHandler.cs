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

    public class GetExpensesQueryHandler(
        IExpenseRepository expenseRepository,
        ICurrentUserService currentUserService,
        IMapper mapper) : IRequestHandler<GetExpensesQuery, IEnumerable<ExpenseDto>>
    {
        public async Task<IEnumerable<ExpenseDto>> Handle(GetExpensesQuery request, CancellationToken cancellationToken)
        {
            var currentUserId = currentUserService.UserId;
            var expenses = await expenseRepository.GetAll(request.GetExpenses, currentUserId);

            return mapper.Map<IEnumerable<ExpenseDto>>(expenses);
        }
    }
}
