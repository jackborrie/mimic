using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Mimic.Models;

[Table("books")]
public class Book : Model
{

    [Column("title")]
    [JsonPropertyName("title")]
    public string Title { get; set; }

    [JsonPropertyName("publication_date")]
    [Column("publication_date")]
    public DateTime? PublicationDate { get; set; } = null;
    
    [JsonPropertyName("isbn")]
    [Column("isbn")]
    public string? Isbn { get; set; }
    
    [JsonPropertyName("lccn")]
    [Column("lccn")]
    public string? Lccn { get; set; }
    
    [JsonPropertyName("has_cover")]
    [Column("has_cover")]
    public bool HasCover { get; set; }
    
    [JsonPropertyName("path")]
    [Column("path")]
    public string? Path { get; set; }

    public List<Author> Authors { get; } = [];

    public List<Tag> Tags { get; } = [];

}