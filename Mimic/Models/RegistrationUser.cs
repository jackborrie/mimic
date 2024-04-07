using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace Mimic.Models;

public class RegistrationUser : MinimumUser
{
    public string Password { get; set; } = string.Empty;
}