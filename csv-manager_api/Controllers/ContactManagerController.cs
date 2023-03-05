using CSV_Manager.Models;
using CSV_Manager.Providers;
using Microsoft.AspNetCore.Mvc;

namespace CSV_Manager.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactManagerController : ControllerBase
    {
        private readonly IContactProvider contactProvider;
        private readonly ILogger<ContactManagerController> logger;        

        public ContactManagerController(IContactProvider contactProvider, ILogger<ContactManagerController> logger)
        {
            this.contactProvider = contactProvider;
            this.logger = logger;
        }

        [HttpGet("contacts/sort")]
        public IEnumerable<Contact> GetContacts(
            string? sort = null, string? method = null
            )
        {
            return contactProvider.GetContactsAsync(sort, method).Result;
        }

        [HttpGet("{id}")]
        public IActionResult GetContactById(int id)
        {
            try
            {
                var contact = contactProvider.GetContactByIdAsync(id).Result;
                return Ok(contact);
            }
            catch (ArgumentException)
            {
                return NotFound($"User with ID:{id} doesn't exist");
            }
        }

        [HttpPost]
        public IActionResult AddContact([FromBody] InputContact addingContact)
        {
            if (ModelState.IsValid)
            {
                var id = contactProvider.AddContactAsync(addingContact).Result;
                return Ok();
            }

            return BadRequest();
        }

        [HttpPut]
        public IActionResult UpdateContact([FromBody] Contact newContact)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    contactProvider.UpdateContactAsync(newContact);                    
                }

                return Ok();
            }
            catch (ArgumentException)
            {
                return NotFound($"User with ID:{newContact.Id} doesn't exist");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteContactById(int id)
        {
            try
            {
                contactProvider.DeleteContact(id);
                return Ok();
            }
            catch(ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}