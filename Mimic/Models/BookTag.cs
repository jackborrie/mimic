using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Mimic.Models;

[Table("book_tags")]
public class BookTag
{
    [JsonPropertyName("tag_id")]
    [Column("tag_id")]
    public string  TagId { get; set; }
    [JsonPropertyName("book_id")]
    [Column("book_id")]
    public string BookId { get; set; }
}