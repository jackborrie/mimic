using System.Text.Json.Serialization;
using Mimic.Attributes;

namespace Mimic.Models;

[TableName("series")]
public class Series : Model
{

    [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

    [JsonPropertyName("created_at")]
        public DateTime? CreatedAt { get; set; } = null;

    [JsonPropertyName("update_at")]
        public DateTime? UpdatedAt { get; set; } = null;

    public override void AdditionalParse()
    {
    }
}