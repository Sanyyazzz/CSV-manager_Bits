using CSV_Manager.Models;

namespace CSV_Manager.Providers
{
    public interface IContactProvider
    {
        public Task<IEnumerable<Contact>> GetContactsAsync(string? sort = null, string? method = null);
        public Task<Contact> GetContactByIdAsync(int id);
        public Task<int> AddContactAsync(InputContact addingContact);
        public Task<int>UpdateContactAsync(Contact newContact);
        public Task DeleteContact(int id);
    }
}
