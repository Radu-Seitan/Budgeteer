﻿using AutoMapper;
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
            RuleFor(e => e.UserId)
                .NotNull();
            RuleFor(e => e.StoreId)
                .NotNull();
        }
    }

    public class CreateExpenseCommandHandler : IRequestHandler<CreateExpenseCommand, Unit>
    {
        private readonly IMapper _mapper;
        private readonly IExpenseRepository _expenseRepository;

        public CreateExpenseCommandHandler(
            IMapper mapper,
            IExpenseRepository expenseRepository)
        {
            _mapper = mapper;
            _expenseRepository = expenseRepository;
        }

        public async Task<Unit> Handle(CreateExpenseCommand request, CancellationToken cancellationToken)
        {
            var expense = _mapper.Map<Expense>(request.CreateExpense);

            await _expenseRepository.Save(expense);
            //TODO decrease income sum for user

            return Unit.Value;
        }
    }
}
