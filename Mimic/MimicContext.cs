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
        // var folder = Environment.SpecialFolder.LocalApplicationData;
        // // var path = Environment.GetFolderPath(folder);
        // var path = Directory.GetCurrentDirectory();
        // DbPath = Path.Join(path, "mimic.db");
        //
    }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=mimic;Username=mimic_owner;Password=mimic_owner");
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Book>()
            .HasMany(e => e.Authors)
            .WithMany(e => e.Books)
            .UsingEntity<BookAuthor>(
                l => l.HasOne<Author>().WithMany().HasForeignKey(e => e.AuthorId),
                r => r.HasOne<Book>().WithMany().HasForeignKey(e => e.BookId)
                );
        
        modelBuilder.Entity<Book>()
            .HasMany(e => e.Tags)
            .WithMany(e => e.Books)
            .UsingEntity<BookTag>(
                l => l.HasOne<Tag>().WithMany().HasForeignKey(e => e.TagId),
                r => r.HasOne<Book>().WithMany().HasForeignKey(e => e.BookId)
            );

        modelBuilder.Entity<Series>()
            .HasMany(s => s.Books)
            .WithOne(b => b.Series)
            .HasForeignKey(b => b.SeriesId);
    }
}