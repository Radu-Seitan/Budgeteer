using Budgeteer.Application.Common.Interfaces;
using MediatR.Pipeline;
using Microsoft.Extensions.Logging;

namespace Budgeteer.Application.Common.Behaviours
{
    public class LoggingBehaviour<TRequest>(
        ILogger<TRequest> logger, 
        ICurrentUserService currentUserService) : IRequestPreProcessor<TRequest>
    {
        public Task Process(TRequest request, CancellationToken cancellationToken)
        {
            var requestName = typeof(TRequest).Name;
            var userId = currentUserService.UserId ?? string.Empty;
            string userName = string.Empty;

            logger.LogInformation("ChatA Request: {Name} {@UserId} {@Request}",
                requestName, userId, request);

            return Task.CompletedTask;
        }
    }
}
