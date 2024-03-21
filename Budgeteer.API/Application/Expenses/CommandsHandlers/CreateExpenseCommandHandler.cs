using AutoMapper;
using Budgeteer.Application.Common.DTOs;
using Budgeteer.Application.Common.Interfaces;
using Budgeteer.Domain.Entities;
using FluentValidation;
using MediatR;

namespace Budgeteer.Application.Expenses.CommandsHandlers
{
    public class CreateExpenseCommand : IRequest<Unit>
    {
        public CreateExpenseDto CreateExpense { get; set; }
    }

    public class CreateExpenseValidator : AbstractValidator<CreateExpenseDto>
    {
        public CreateExpenseValidator()
        {
            RuleFor(e => e.Quantity)
                .NotNull();
            RuleFor(e => e.Category)
                .NotNull();
            RuleFor(e => e.StoreId)
                .NotNull();
        }
    }

    public class CreateExpenseCommandHandler(
        IExpenseRepository expenseRepository,
        ICurrentUserService currentUserService,
        IMapper mapper) : IRequestHandler<CreateExpenseCommand, Unit>
    {
        public async Task<Unit> Handle(CreateExpenseCommand request, CancellationToken cancellationToken)
        {
            var expense = mapper.Map<Expense>(request.CreateExpense);

            var currentUserId = currentUserService.UserId;
            expense.UserId = currentUserId;

            await expenseRepository.Save(expense);
            //TODO decrease income sum for user

            return Unit.Value;
        }
    }
}
