using System.Security.Claims;
using Mimic.Models;

namespace Mimic.Lib;

public static class Extensions
{
    public static IEnumerable<string> GetRoles(this ClaimsPrincipal @this)
    {
        return ((ClaimsIdentity)@this.Identity).Claims
            .Where(c => c.Type == ClaimTypes.Role)
            .Select(c => c.Value);
    }
}