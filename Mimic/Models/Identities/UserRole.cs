using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Mimic.Models.Identities;

public class UserRole: IdentityRole
{

    [NotMapped]
    public int Count { get; set; } = 0;

}