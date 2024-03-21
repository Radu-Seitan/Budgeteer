using AutoMapper;
using Budgeteer.Application.Common.DTOs;
using Budgeteer.Application.Common.Interfaces;
using Budgeteer.Domain.Entities;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;

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
        UserManager<User> userManager,
        IMapper mapper) : IRequestHandler<CreateExpenseCommand, Unit>
    {
        public async Task<Unit> Handle(CreateExpenseCommand request, CancellationToken cancellationToken)
        {
            var expense = mapper.Map<Expense>(request.CreateExpense);

            var currentUserId = currentUserService.UserId;
            expense.UserId = Guid.Parse(currentUserId);

            await expenseRepository.Save(expense);

            //decrease income sum for user
            var user = await userManager.FindByIdAsync(currentUserId);
            user.Sum -= request.CreateExpense.Quantity;
            await userManager.UpdateAsync(user);

            return Unit.Value;
        }
    }
}
