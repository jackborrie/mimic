using Microsoft.EntityFrameworkCore;
using Mimic.Models;

namespace Mimic;

public class MimicContext: DbContext
{
    
    public DbSet<Book> Books { get; set; }
    public DbSet<Author> Authors { get; set; }
    
    public string DbPath { get; set; }

    public MimicContext()
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        DbPath = System.IO.Path.Join(path, "metadata.db");
    }
    
    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source={DbPath}");
    
}