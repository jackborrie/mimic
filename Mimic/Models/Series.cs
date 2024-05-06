using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Mimic.Models;

[Table("series")]
public class Series : Model
{

    [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

    [JsonPropertyName("created_at")]
        public DateTime? CreatedAt { get; set; } = null;

    [JsonPropertyName("update_at")]
        public DateTime? UpdatedAt { get; set; } = null;
}