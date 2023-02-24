using CSV_Manager.Models;
using Microsoft.AspNetCore.Mvc;

namespace CSV_Manager.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactManagerController : ControllerBase
    {
        private readonly CsvManagerDbContext context;
        private readonly ILogger<ContactManagerController> _logger;

        public ContactManagerController(CsvManagerDbContext context, ILogger<ContactManagerController> logger)
        {
            this.context = context;
            _logger = logger;
        }

        [HttpGet("contacts/sort")]
        public IEnumerable<Contact> GetContacts(
            string? sort = null, string? method = null)
        {
            var contacts = context.Contacts.ToList();
            var sortMethod = new SortParams(sort, method);

            return sortMethod.GetSortingList(contacts);
        }

        [HttpGet("{id}")]
        public IActionResult GetContactById(int id)
        {
            var contactById = context.Contacts.Where(c => c.Id == id).Single();

            if(contactById != null)
            {
                return Ok(contactById);
            }

            return NotFound();
        }

        [HttpPost]
        public IActionResult AddContact([FromBody] InputContact addingContact)
        {
            var contact = new Contact(addingContact);

            if (ModelState.IsValid)
            {
                context.Contacts.Add(contact);
                context.SaveChanges();
                return Ok();
            }

            return BadRequest();
        }

        [HttpPut]
        public IActionResult UpdateContact([FromBody] Contact newContact)
        {
            if (ModelState.IsValid)
            {
                var editingContact = context.Contacts.Where(c => c.Id == newContact.Id).Single();

                if(editingContact != null)
                {
                    editingContact.Name = newContact.Name;
                    editingContact.DateOfBirthday = newContact.DateOfBirthday;
                    editingContact.PhoneNumber = newContact.PhoneNumber;
                    editingContact.IsMarried = newContact.IsMarried;
                    editingContact.Salary = newContact.Salary;

                    context.SaveChanges();
                    return Ok();
                }

                return NotFound();
            }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteContactById(int id)
        {
            var contactById = context.Contacts.Where(c => c.Id == id).Single();

            if (contactById != null)
            {
                context.Contacts.Remove(contactById);
                context.SaveChanges();
                return Ok();
            }

            return BadRequest();
        }
    }
}