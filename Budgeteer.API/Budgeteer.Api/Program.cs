using Budgeteer.Api.Extensions;
using Budgeteer.Api.Services;
using Budgeteer.Api.Settings;
using Budgeteer.Application;
using Budgeteer.Application.Common.Interfaces;
using Budgeteer.Infrastructure;
using Microsoft.Extensions.Options;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("ClientPermission", policy =>
    {
        policy.SetIsOriginAllowed((host) => true)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

// Configure Kestrel to use HTTP in development environment
if (builder.Environment.IsDevelopment())
{
    builder.WebHost.ConfigureKestrel(serverOptions =>
    {
        serverOptions.ListenAnyIP(5030); // HTTP port
    });
}


// Add services to the container.
builder.Services
    .AddInfrastructure(builder.Configuration)
    .AddApplication(builder.Configuration);

//Identity
builder.Services.AddIdenity();

builder.Services.AddControllers()
    .AddJsonOptions(opts =>
    {
        var enumConverter = new JsonStringEnumConverter();
        opts.JsonSerializerOptions.Converters.Add(enumConverter);
        opts.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurity();
});

builder.Services.AddTransient<ICurrentUserService, CurrentUserService>();

builder.Services.AddHttpContextAccessor();

//Jwt Auth
var jwtSettings = builder.Configuration.GetSection("Jwt").Get<JwtSettings>();
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("Jwt"));
builder.Services.AddAuth(jwtSettings);


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MigrateDatabase();

// app.UseHttpsRedirection();

app.UseAuth();

app.MapControllers();

app.UseCors("ClientPermission");

app.Run();
