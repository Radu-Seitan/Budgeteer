using Budgeteer.Domain.Entities;
using Budgeteer.Infrastructure.Persistence;
using Microsoft.AspNetCore.Identity;

namespace Budgeteer.Api.Extensions
{
    public static class IdenityExtension
    {
        public static IServiceCollection AddIdenity(
            this IServiceCollection services) 
        {
            services.AddIdentity<User, Role>(opt =>
                {
                    opt.Password.RequiredLength = 8;
                    opt.User.RequireUniqueEmail = true;
                    opt.Password.RequireNonAlphanumeric = false;
                    opt.SignIn.RequireConfirmedEmail = false;
                    opt.SignIn.RequireConfirmedAccount = false;
                    
                })
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();

            return services;
        }
    }
}
