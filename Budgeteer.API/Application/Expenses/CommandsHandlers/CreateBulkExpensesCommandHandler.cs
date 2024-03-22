using AutoMapper;
using Budgeteer.Application.Common.DTOs;
using Budgeteer.Application.Common.Interfaces;
using Budgeteer.Domain.Entities;
using MediatR;

namespace Budgeteer.Application.Expenses.CommandsHandlers
{
    public class CreateBulkExpensesCommand : IRequest<Unit>
    {
        public IEnumerable<CreateExpenseDto> Expenses { get; set; }
    }

    public class CreateBulkExpensesCommandHandler(
        IExpenseRepository expenseRepository,
        ICurrentUserService currentUserService) : IRequestHandler<CreateBulkExpensesCommand, Unit>
    {
        public async Task<Unit> Handle(CreateBulkExpensesCommand request, CancellationToken cancellationToken)
        {
            var currentUserId = Guid.Parse(currentUserService.UserId);

            var expenses = request.Expenses.Select(x => new Expense
            {
                UserId = currentUserId,
                Category = x.Category,
                Quantity = x.Quantity,
                StoreId = x.StoreId,
            });

            await expenseRepository.AddRange(expenses);

            return Unit.Value;
        }
    }
}
