using Budgeteer.Application.Common.Interfaces;
using System.Security.Claims;

namespace Budgeteer.Api.Services
{
    public class CurrentUserService(
        IHttpContextAccessor httpContextAccessor) : ICurrentUserService
    {
        public string UserId => httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
    }
}
