using AutoMapper;
using Budgeteer.Application.Common.DTOs;
using Budgeteer.Domain.Entities;

namespace Budgeteer.Application.Common.Profiles
{
    public class ExpenseProfile : Profile
    {
        public ExpenseProfile()
        {
            CreateMap<Expense, ExpenseDto>();
            CreateMap<CreateExpenseDto, Expense>();
        }
    }
}
