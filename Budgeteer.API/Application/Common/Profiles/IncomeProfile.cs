using AutoMapper;
using Budgeteer.Application.Common.DTOs;
using Budgeteer.Domain.Entities;

namespace Budgeteer.Application.Common.Profiles
{
    public class IncomeProfile : Profile
    {
        public IncomeProfile()
        {
            CreateMap<CreateIncomeDto, Income>();
        }
    }
}
