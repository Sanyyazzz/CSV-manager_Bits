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

        public IEnumerable<Contact> GetSortingList(List<Contact> list)
        {
            var sortingList = list;

            switch (FieldOfSort)
            {
                case "name":
                    if (MethodOfSort == "orderBy") sortingList = list.OrderBy(c => c.Name).ToList();
                    if (MethodOfSort == "orderByDesc") sortingList = list.OrderByDescending(c => c.Name).ToList();                
                        
                    break;

                case "dateOfBirth":
                    if (MethodOfSort == "orderBy") sortingList = list.OrderBy(c => c.DateOfBirthday).ToList();
                    if (MethodOfSort == "orderByDesc") sortingList = list.OrderByDescending(c => c.DateOfBirthday).ToList();
                    break;

                case "isMarried":
                    if (MethodOfSort == "orderBy") sortingList = list.OrderBy(c => c.IsMarried).ToList();
                    if (MethodOfSort == "orderByDesc") sortingList = list.OrderByDescending(c => c.IsMarried).ToList();
                    break;

                case "salary":
                    if (MethodOfSort == "orderBy") sortingList = list.OrderBy(c => c.Salary).ToList();
                    if (MethodOfSort == "orderByDesc") sortingList = list.OrderByDescending(c => c.Salary).ToList();
                    break;

                default: 
                    break;
            }

            return sortingList;
        }
    }
}
