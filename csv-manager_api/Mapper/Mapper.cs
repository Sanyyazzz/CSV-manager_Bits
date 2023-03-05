using AutoMapper;
using CSV_Manager.Models;

namespace CSV_Manager.Mapper
{
    public class ContactProfile : Profile
    {
        public ContactProfile()
        {
            CreateMap<InputContact, Contact>();

        }      
    }
}
