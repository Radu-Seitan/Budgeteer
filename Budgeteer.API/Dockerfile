FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 7069
EXPOSE 5030

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY . .

RUN dotnet restore "Budgeteer.Api/Budgeteer.Api.csproj"

FROM build AS publish
RUN dotnet publish "Budgeteer.Api/Budgeteer.Api.csproj" -c Release -o /app/publish -v d

FROM base AS final
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Budgeteer.Api.dll"]