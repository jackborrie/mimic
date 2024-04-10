using System.ComponentModel.DataAnnotations.Schema;

namespace Mimic.Models;

[Table("AspNetserRoles")]
public class UserRoles
{
    public string UserId { get; set; } = string.Empty;
    public string RoleId { get; set; } = string.Empty;
    
}