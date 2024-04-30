using System.Reflection;
using Mimic.Attributes;

namespace Mimic.Lib;

public static class Helpers
{
    public static string GetColumn(this PropertyInfo pi)
    {
        Attribute[] attrs = System.Attribute.GetCustomAttributes(pi);
        
        foreach (Attribute attr in attrs)
        {
            if (attr is ColumnName c)
            {
                return c.GetColumn();
            }
        }
        
        return "";
    }

    public static string CleanUpFileNames(string fileName)
    {
        fileName = fileName.Replace(",", string.Empty);
        fileName = fileName.Replace(" ", "_");
        fileName = fileName.Replace("-", string.Empty);
        fileName = fileName.ToLower();

        return fileName;
    }
}