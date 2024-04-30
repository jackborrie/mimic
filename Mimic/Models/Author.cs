using System.Text.Json.Serialization;
using Mimic.Attributes;

namespace Mimic.Models;

public class Author : Model
{
    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;
    
    [JsonPropertyName("link")]
    public string Link { get; set; } = string.Empty;

    [JsonPropertyName("created_at")]
        public DateTime? CreatedAt { get; set; } = null;

    [JsonPropertyName("update_at")]
        public DateTime? UpdatedAt { get; set; } = null;

    public List<Book> Books { get; set; } = new List<Book>();
    
    public override void AdditionalParse()
    {
        
    }
}