using System.Globalization;
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

    public static object GetReflectedPropertyValue(this object subject, string property)
    {
        return subject.GetType().GetProperty(property).GetValue(subject, null);
    }

    public static List<T> Paginate<T>(this IOrderedQueryable<T> list, int? skip, int? take)
    {
        IQueryable<T> result = list;
        if (skip.HasValue) result = result.Skip(skip.Value);
        if (skip.HasValue && take.HasValue) result = result.Take(take.Value);
        return result.ToList();
    }

    public static IOrderedQueryable<T> Sort<T>(this IQueryable<T> list, string sortBy, string? sortDirection)
    {
        IOrderedQueryable<T> output;
        if (!string.IsNullOrEmpty(sortDirection))
        {
            if (string.IsNullOrEmpty(sortDirection) || sortDirection == "desc" || sortDirection != "asc")
            {
                output = list.OrderByDescending(item => item.GetReflectedPropertyValue(sortBy.fromSnakeToPascal()));
            }
            else
            {
                output = list.OrderBy(item => item.GetReflectedPropertyValue(sortBy.fromSnakeToPascal()));
            }
        }
        else
        {
            output = list.OrderByDescending(item => item.GetReflectedPropertyValue(sortBy.fromSnakeToPascal()));
        }

        return output;
    }

    public static string fromSnakeToPascal(this string input)
    {
        var newString = input.ToLower().Replace("_", " ");
        TextInfo info = CultureInfo.CurrentCulture.TextInfo;
        newString = info.ToTitleCase(newString).Replace(" ", string.Empty);
        return newString;
    }
}

