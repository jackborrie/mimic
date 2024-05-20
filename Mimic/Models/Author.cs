using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Mimic.Models;

[Table("authors")]
public class Author : Model
{
    [JsonPropertyName("name")]
    [Column("name")]
    public string Name { get; set; } = string.Empty;
        
    [JsonIgnore]
    public List<Book> Books { get; } = [];
}