using System.Reflection;

namespace Mimic.Lib;

public static class Helpers
{

    public static string CleanUpFileNames(string fileName)
    {
        fileName = fileName.Replace(",", string.Empty);
        fileName = fileName.Replace(" ", "_");
        fileName = fileName.Replace("-", string.Empty);
        fileName = fileName.ToLower();

        return fileName;
    }
}