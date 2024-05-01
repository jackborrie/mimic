using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Mimic.Attributes;

namespace Mimic.Models;

[Table("authors")]
public class Author : Model
{
    [JsonPropertyName("name")]
    [Column("name")]
    public string Name { get; set; } = string.Empty;
    
    [JsonPropertyName("link")]
    [Column("link")]
    public string Link { get; set; } = string.Empty;
        
    [JsonIgnore]
    public List<Book> Books { get; } = [];
    
    public override void AdditionalParse()
    {
        
    }
}