using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Mimic.Attributes;

namespace Mimic.Models;

public class Book : Model
{

    [JsonPropertyName("title")]
    public string? Title { get; set; } = null;

    [JsonPropertyName("publication_date")]
    public DateTime? PublicationDate { get; set; } = null;
    
    [JsonPropertyName("authors")]
    public List<string> Authors { get; set; } = new List<string>();
    
    [JsonPropertyName("isbn")]
    public string? Isbn { get; set; }
    
    [JsonPropertyName("lccn")]
    public string? Lccn { get; set; }
    
    [JsonPropertyName("has_cover")]
    public bool HasCover { get; set; }
    
    [JsonPropertyName("path")]
    public string? Path { get; set; }

    [JsonPropertyName("created_at")]
    public DateTime? CreatedAt { get; set; } = null;

    [JsonPropertyName("update_at")]
    public DateTime? UpdatedAt { get; set; } = null;

    public override void AdditionalParse()
    {
    }
}