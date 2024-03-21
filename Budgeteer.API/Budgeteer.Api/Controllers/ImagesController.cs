using Budgeteer.Application.AppImages.CommandsHandlers;
using Budgeteer.Application.AppImages.QueriesHandlers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Budgeteer.Api.Controllers
{
    [ApiController]
    [Route("api/images")]
    [Authorize]
    public class ImagesController
        (IMediator mediator): ControllerBase
    {
        [HttpPost("{storeId}")]
        public async Task<IActionResult> Post(IFormFile file, [FromRoute] int storeId)
        {
            if (file != null)
            {
                if (file.Length > 0)
                {
                    byte[] content = null;
                    using (var fileStream = file.OpenReadStream())
                    using (var memoryStream = new MemoryStream())
                    {
                        fileStream.CopyTo(memoryStream);
                        content = memoryStream.ToArray();
                    }

                    var command = new UploadImageCommand
                    {
                        Content = content,
                        Type = file.ContentType,
                        StoreId = storeId
                    };
                    var imageId = await mediator.Send(command);
                    return Ok(imageId);
                }
                else return BadRequest("file length");
            }
            else return BadRequest("file[0] is null");
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get([FromRoute] Guid id)
        {
            var query = new GetImageQuery
            {
                ImageId = id
            };
            var image = await mediator.Send(query);

            return File(image.Content, $"{image.Type}");
        }
    }
}
