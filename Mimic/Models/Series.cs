using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Mimic.Models;

[Table("series")]
public class Series : Model
{
    [JsonPropertyName("name")] 
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("books")] public Book[] Books { get; set; } = [];
}