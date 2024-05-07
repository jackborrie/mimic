using Mimic.Models;

namespace Mimic;

public class UploadHandler
{
    private static List<string> _allowedFileExtensions = [".epub"];

    public static string? UploadTemp(IFormFile file)
    {
        
        var tempDirectoryPath = Path.Combine("Uploads", "temp");
        
        if (!Directory.Exists(tempDirectoryPath))
        {
            Directory.CreateDirectory(tempDirectoryPath);
        }
        // File extension check
        var extension = Path.GetExtension(file.FileName);

        if (!_allowedFileExtensions.Contains(extension))
        {
            return null;
        }

        long size = file.Length;

        if (size > (100 * 1024 * 1024))
        {
            return null;
        }


        var filePath = Path.Combine(tempDirectoryPath, file.FileName);

        if (File.Exists(filePath))
        {
            return filePath;
        }
        
        try
        {
            using var stream = new FileStream(Path.Combine(Directory.GetCurrentDirectory(), filePath), FileMode.Create);
            file.CopyTo(stream);
        }
        catch (IOException e)
        {
            return null;
        }

        return filePath;
    }

    public static string? MoveBook(Book newBook, string currentFilePath)
    {
        if (string.IsNullOrEmpty(currentFilePath))
        {
            return null;
        }

        var author = newBook.Authors.FirstOrDefault();
        string authorPath;
        
        if (author == null)
        {
            authorPath = "unknown";
        }
        else
        {
            authorPath = author.Name;
        }

        authorPath = CreateSafeDirectory(authorPath);

        var bookPathSection = CreateSafeDirectory(newBook.Title);

        var bookDir = Path.Combine("Uploads", authorPath, bookPathSection);

        if (!Directory.Exists(bookDir))
        {
            Directory.CreateDirectory(bookDir);
        }
        
        var bookPath = Path.Combine(bookDir, bookPathSection + ".epub");
        try
        {
            File.Move(Path.Combine(Directory.GetCurrentDirectory(), currentFilePath), bookPath);
        }
        catch (IOException e)
        {
            return null;
        }
        
        return bookDir;
    }

    public static string? GetBookFilePath(Book book)
    {
        if (book.Path == null)
        {
            return null;
        }
        
        var output = Path.Combine(Directory.GetCurrentDirectory(), book.Path,
            CreateSafeDirectory(book.Title) + ".epub");

        return output;
    }

    private static string CreateSafeDirectory(string directory)
    {
        foreach (var invalidChar in Path.GetInvalidFileNameChars())
        {
            directory = directory.Replace(invalidChar.ToString(), string.Empty);
        }

        directory = directory.Replace("-", string.Empty);
        directory = directory.Replace("  ", " ");
        directory = directory.Replace(" ", "-");
        directory = directory.Replace(",", string.Empty);
        directory = directory.Replace(".", string.Empty);
        directory = directory.ToLower();
        
        return directory;
    }

    public static bool SaveCover(string bookDirectory, byte[] image)
    {
        using var ms = new MemoryStream(image);
        using var fs = new FileStream(Path.Combine(bookDirectory, "cover.jpg"), FileMode.Create);

        try
        {
            ms.WriteTo(fs);
        }
        catch (IOException e)
        {
            return false;
        }
        
        return true;
    }
}