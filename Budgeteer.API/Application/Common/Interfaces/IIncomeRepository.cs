using Budgeteer.Application.Common.DTOs;
using Budgeteer.Domain.Entities;

namespace Budgeteer.Application.Common.Interfaces
{
    public interface IIncomeRepository
    {
        Task Save(Income income);
        Task<IEnumerable<Income>> GetAll(GetIncomesDto request, string? userId = null);
    }
}
