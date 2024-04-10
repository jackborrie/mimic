namespace Mimic.Models;

public class MinimumUser
{
    public string Id { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;

    public string[] Roles { get; set; } = [];
}