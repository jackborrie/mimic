using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Mimic.Models;

[Table("tags")]
public class Tag : Model
{
    [JsonPropertyName("text")] 
    [Column("text")]
    public string Text { get; set; } = string.Empty;
    
    [JsonPropertyName("color")] 
    [Column("color")]
    public string Color { get; set; } = string.Empty;
    
    [JsonPropertyName("icon")] 
    [Column("icon")]
    public string Icon { get; set; } = string.Empty;
    
    [JsonPropertyName("icon_pos")] 
    [Column("icon_pos")]
    public string IconPos { get; set; } = string.Empty;

    [JsonIgnore]
    public List<Book> Books { get; } = [];
}