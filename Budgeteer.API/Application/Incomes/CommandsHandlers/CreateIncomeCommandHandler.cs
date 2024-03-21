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

    public class CreateIncomeCommandHandler : IRequestHandler<CreateIncomeCommand, Unit>
    {
        private readonly IMapper _mapper;
        private readonly IIncomeRepository _incomeRepository;

        public CreateIncomeCommandHandler(
            IMapper mapper,
            IIncomeRepository incomeRepository)
        {
            _mapper = mapper;
            _incomeRepository = incomeRepository;
        }

        public async Task<Unit> Handle(CreateIncomeCommand request, CancellationToken cancellationToken)
        {
            var income = _mapper.Map<Income>(request.CreateIncome);

            await _incomeRepository.Save(income);
            //TODO increase income in user

            return Unit.Value;
        }
    }
}
