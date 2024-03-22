using Budgeteer.Application.Common.DTOs;
using Budgeteer.Application.Expenses.CommandsHandlers;
using Budgeteer.Application.Expenses.QueriesHandlers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Budgeteer.Api.Controllers
{
    [ApiController]
    [Route("api/expenses")]
    [Authorize]
    public class ExpensesController(IMediator mediator) : ControllerBase
    {
        [HttpGet]
        public async Task<IEnumerable<ExpenseDto>> GetExpenses(
            [FromQuery] GetExpensesDto request)
        {
            var query = new GetExpensesQuery
            {
                GetExpenses = request,
            };

            var expenses = await mediator.Send(query);

            return expenses;
        }

        [HttpPost]
        public async Task<IActionResult> CreateExpense(
            [FromBody] CreateExpenseDto request)
        {
            var command = new CreateExpenseCommand
            {
                CreateExpense = request,
            };

            await mediator.Send(command);

            return Ok();
        }

        [HttpPost]
        [Route("bulk")]
        public async Task<IActionResult> CreateExpenses(
            [FromBody] IEnumerable<CreateExpenseDto> request)
        {
            var command = new CreateBulkExpensesCommand
            {
                Expenses = request
            };

            await mediator.Send(command);

            return Ok();
        }
    }
}
