using CSV_Manager.Controllers;
using CSV_Manager.Models;
using Microsoft.Extensions.Logging;
using Xunit;

namespace UnitTestForProject
{
    public class UnitTest1
    {
        private readonly CsvManagerDbContext context = new CsvManagerDbContext();
        private readonly ILogger<ContactManagerController> logger;

        [Fact]
        public void ControllerHaveConnectionWithDb()
        {
            var controller = new ContactManagerController(context, logger);

            var result = controller.GetContacts() as List<Contact>;

            Assert.NotNull(result);
        }
    }
}