using AutoMapper;
using CSV_Manager.Models;

namespace CSV_Manager.Providers
{
    public class ContactProvider : IContactProvider
    {
        private CsvManagerDbContext context;
        private IMapper mapper;

        public ContactProvider(CsvManagerDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<int> AddContactAsync(InputContact addingContact)
        {
            var contact = mapper.Map<Contact>(addingContact);

            context.Contacts.Add(contact);
            await context.SaveChangesAsync();

            return contact.Id;
        }

        public async Task DeleteContact(int id)
        {
            var contactById = context.Contacts.Find(id);

            if (contactById != null)
            {
                context.Contacts.Remove(contactById);
                await context.SaveChangesAsync();
            }
            else
            {
                throw new ArgumentException("User with this id was not founded");
            }
        }

        public async Task<Contact> GetContactByIdAsync(int id)
        {
            var contactById = await context.Contacts.FindAsync(id);

            if (contactById != null)
            {
                return contactById;
            }
            else
            {
                throw new ArgumentException("User with this id was not founded");
            }
        }

        public async Task<IEnumerable<Contact>> GetContactsAsync(string? sort = null, string? method = null)
        {
            var sortMethod = new SortParams(sort, method);

            return await sortMethod.GetSortingListAsync(context);
        }

        public async Task<int> UpdateContactAsync(Contact newContact)
        {
            var editingContact = context.Contacts.Find(newContact.Id);

            if (editingContact != null)
            {
                editingContact.Name = newContact.Name;
                editingContact.DateOfBirthday = newContact.DateOfBirthday;
                editingContact.PhoneNumber = newContact.PhoneNumber;
                editingContact.Salary = newContact.Salary;
                editingContact.IsMarried = newContact.IsMarried;

                await context.SaveChangesAsync();
                return editingContact.Id;
            }
            else
            {
                throw new ArgumentException("User with this id was not founded");
            }
        }
    }
}
