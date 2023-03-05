using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CSV_Manager.Models;

public partial class Contact
{
    public Contact()
    {
           
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
