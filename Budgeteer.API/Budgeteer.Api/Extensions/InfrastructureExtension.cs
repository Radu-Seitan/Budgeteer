using Budgeteer.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System.Threading;

namespace Budgeteer.Api.Extensions
{
    public static class InfrastructureExtension
    {
        public static void MigrateDatabase(this WebApplication webApplication)
        {
            using var scope = webApplication.Services.CreateScope();

            scope.ServiceProvider
                    .GetRequiredService<AppDbContext>()
                    .Database
                    .Migrate();
        }
    }
}
