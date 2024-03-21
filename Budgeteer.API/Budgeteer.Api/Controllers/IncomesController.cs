using Budgeteer.Application.Common.DTOs;
using Budgeteer.Application.Incomes.CommandsHandlers;
using Budgeteer.Application.Incomes.QueriesHandlers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Budgeteer.Api.Controllers
{
    [ApiController]
    [Route("api/incomes")]
    public class IncomesController(IMediator mediator) : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public async Task<IEnumerable<IncomeDto>> GetIncomes(
            [FromQuery] GetIncomesDto request)
        {
            var query = new GetIncomesQuery
            {
                GetIncomes = request
            };

            var incomes = await mediator.Send(query);

            return incomes;
        }

        [HttpPost]
        public async Task<IActionResult> CreateIncome(
            [FromBody] CreateIncomeDto request)
        {
            var command = new CreateIncomeCommand
            {
                CreateIncome = request,
            };

            await mediator.Send(command);

            return Ok();
        }
    }
}
