using AutoMapper;
using Budgeteer.Application.Common.DTOs;
using Budgeteer.Domain.Entities;

namespace Budgeteer.Application.Common.Profiles
{
    public class StoreProfile : Profile
    {
        public StoreProfile() 
        {
            CreateMap<Store, StoreDto>();
        }
    }
}
