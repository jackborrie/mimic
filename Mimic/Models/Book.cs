using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Mimic.Models;

[Table("books")]
public class Book : Model
{

    [Column("title")]
    [JsonPropertyName("title")]
    public string Title { get; set; }

    [JsonPropertyName("has_cover")]
    [Column("has_cover")]
    public bool HasCover { get; set; }
    
    [JsonPropertyName("path")]
    [Column("path")]
    public string? Path { get; set; }
    
    [JsonPropertyName("description")]
    [Column("description")]
    public string? Description { get; set; }
    
    [Column("isbn")]
    [JsonPropertyName("isbn")]
    public string? Isbn { get; set; }
    
    [Column("had_initial_search")]
    [JsonPropertyName("had_initial_search")]
    public bool HadInitialSearch { get; set; }
    
    [JsonPropertyName("series_id")]
    [Column("series_id")]
    public string? SeriesId { get; set; }
    
    [JsonPropertyName("series_index")]
    [Column("series_index")]
    public int? SeriesIndex { get; set; }

    public Series Series { get; set; } = null;

    public List<Author> Authors { get; } = [];

    public List<Tag> Tags { get; } = [];

}