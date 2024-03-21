using AutoMapper;
using Budgeteer.Application.Common.DTOs;
using Budgeteer.Application.Common.Interfaces;
using Budgeteer.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Budgeteer.Application.Incomes.CommandsHandlers
{
    public class CreateIncomeCommand : IRequest<Unit>
    {
        public CreateIncomeDto CreateIncome { get; set; }
    }

    public class CreateIncomeCommandHandler(
        IIncomeRepository incomeRepository,
        ICurrentUserService currentUserService,
        UserManager<User> userManager,
        IMapper mapper) : IRequestHandler<CreateIncomeCommand, Unit>
    {
        public async Task<Unit> Handle(CreateIncomeCommand request, CancellationToken cancellationToken)
        {
            var income = mapper.Map<Income>(request.CreateIncome);

            var currentUserId = currentUserService.UserId;
            income.UserId = Guid.Parse(currentUserId);

            await incomeRepository.Save(income);
            
            //increase income in user
            var user = await userManager.FindByIdAsync(currentUserId);
            user.Sum += request.CreateIncome.Quantity;
            await userManager.UpdateAsync(user);

            return Unit.Value;
        }
    }
}
