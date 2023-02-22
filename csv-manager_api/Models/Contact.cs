using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CSV_Manager.Models;

public partial class Contact
{
    public Contact()
    {
           
    }

    public Contact(InputContact inputContact)
    {
        Id = 0;
        Name = inputContact.Name;
        DateOfBirthday = inputContact.DateOfBirthday;
        IsMarried = inputContact.IsMarried;
        PhoneNumber = inputContact.PhoneNumber;
        Salary = inputContact.Salary;
    }

    [Key]
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public DateTime DateOfBirthday { get; set; }

    public bool? IsMarried { get; set; }

    public string PhoneNumber { get; set; } = null!;

    public double? Salary { get; set; }
}

public partial class InputContact
{
    public string Name { get; set; } = null!;

    public DateTime DateOfBirthday { get; set; }

    public bool? IsMarried { get; set; }

    public string PhoneNumber { get; set; } = null!;

    public double? Salary { get; set; }
}
