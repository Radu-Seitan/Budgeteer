using AutoMapper;
using Budgeteer.Application.Common.DTOs;
using Budgeteer.Application.Common.Interfaces;
using Budgeteer.Domain.Entities;
using MediatR;

namespace Budgeteer.Application.Incomes.CommandsHandlers
{
    public class CreateIncomeCommand : IRequest<Unit>
    {
        public CreateIncomeDto CreateIncome { get; set; }
    }

    public class CreateIncomeCommandHandler(
        IIncomeRepository incomeRepository,
        ICurrentUserService currentUserService,
        IMapper mapper) : IRequestHandler<CreateIncomeCommand, Unit>
    {
        public async Task<Unit> Handle(CreateIncomeCommand request, CancellationToken cancellationToken)
        {
            var income = mapper.Map<Income>(request.CreateIncome);

            var currentUserId = currentUserService.UserId;
            income.UserId = currentUserId;

            await incomeRepository.Save(income);
            //TODO increase income in user

            return Unit.Value;
        }
    }
}
