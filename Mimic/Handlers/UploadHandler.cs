namespace Mimic;

public class UploadHandler
{
    private static List<string> _allowedFileExtensions = [".epub"];

    public static string UploadTemp(IFormFile file)
    {
        // File extension check
        var extension = Path.GetExtension(file.FileName);

        if (!_allowedFileExtensions.Contains(extension))
        {
            return "Invalid filetype: " + extension;
        }

        long size = file.Length;

        if (size > (5 * 1024 * 1024))
        {
            return $"File size [{size}] too large. Maximum file size is 5mb.";
        }

        var path = Path.Combine(Directory.GetCurrentDirectory(), "Uploads\\temp");
        using var stream = new FileStream(path + "\\" + file.FileName, FileMode.Create);
        file.CopyTo(stream);
        
        return "success";
    }
}