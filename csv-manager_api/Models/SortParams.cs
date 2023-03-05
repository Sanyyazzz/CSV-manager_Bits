using Microsoft.EntityFrameworkCore;

namespace CSV_Manager.Models
{
    public class SortParams
    {
        public SortParams(string fieldOfSort, string methodOfSort)
        {
            FieldOfSort = fieldOfSort;
            MethodOfSort = methodOfSort;
        }

        public string FieldOfSort { get; set; } = null;
        public string MethodOfSort { get; set; } = null;

        public async Task<IEnumerable<Contact>> GetSortingListAsync(CsvManagerDbContext context)
        {
            var sortingList = new List<Contact>();

            switch (FieldOfSort)
            {
                case "name":
                    if (MethodOfSort == "orderBy") sortingList = await context.Contacts.OrderBy(c => c.Name).ToListAsync();
                    if (MethodOfSort == "orderByDesc") sortingList = await context.Contacts.OrderByDescending(c => c.Name).ToListAsync();                
                        
                    break;

                case "dateOfBirth":
                    if (MethodOfSort == "orderBy") sortingList = await context.Contacts.OrderBy(c => c.DateOfBirthday).ToListAsync();
                    if (MethodOfSort == "orderByDesc") sortingList = await context.Contacts.OrderByDescending(c => c.DateOfBirthday).ToListAsync();
                    break;

                case "isMarried":
                    if (MethodOfSort == "orderBy") sortingList = await context.Contacts.OrderBy(c => c.IsMarried).ToListAsync();
                    if (MethodOfSort == "orderByDesc") sortingList = await context.Contacts.OrderByDescending(c => c.IsMarried).ToListAsync();
                    break;

                case "salary":
                    if (MethodOfSort == "orderBy") sortingList = await context.Contacts.OrderBy(c => c.Salary).ToListAsync();
                    if (MethodOfSort == "orderByDesc") sortingList = await context.Contacts.OrderByDescending(c => c.Salary).ToListAsync();
                    break;

                default:
                    sortingList = await context.Contacts.ToListAsync();
                    break;
            }

            return sortingList;
        }
    }
}
