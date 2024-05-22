using Budgeteer.Application.Common.DTOs;
using Budgeteer.Application.Stores.CommandsHandlers;
using Budgeteer.Application.Stores.QueriesHandlers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Budgeteer.Api.Controllers
{
    [ApiController]
    [Route("api/stores")]
    [Authorize]
    public class StoresController(IMediator mediator) : ControllerBase
    {
        [HttpGet]
        [Route("{storeId}")]
        [Authorize]
        public async Task<StoreDto> GetStoreById(
            [FromRoute] int storeId)
        {
            var query = new GetStoreQuery
            {
                StoreId = storeId
            };

            var store = await mediator.Send(query);

            return store;
        }

        [HttpGet]
        public async Task<IEnumerable<StoreDto>> GetStores()
        {
            var query = new GetAllStoresQuery();

            var stores = await mediator.Send(query);

            return stores;
        }

        [HttpPost]
        public async Task<IActionResult> CreateStore(
            [FromBody] string name)
        {
            var command = new CreateStoreCommand
            {
                Name = name
            };

            await mediator.Send(command);

            return Ok();
        }
    }
}
