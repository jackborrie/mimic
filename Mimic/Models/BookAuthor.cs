using System.ComponentModel.DataAnnotations.Schema;

namespace Mimic.Models;

[Table("book_authors")]
public class BookAuthor
{
    [Column("author_id")]
    public string  AuthorId { get; set; }
    [Column("book_id")]
    public string BookId { get; set; }
}