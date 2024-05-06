using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Data.SQLite;
using System.Text.Json.Serialization;
using Mimic.Lib;

namespace Mimic.Models;

public abstract class Model
{
    [Key]
    [JsonPropertyName("id")]
    [Column("id")]
    public string Id { get; set; }

    [JsonPropertyName("created_at")]
    [Column("created_at")]
    public DateTime? CreatedAt { get; set; } = null;

    [JsonPropertyName("updated_at")]
    [Column("updated_at")]
    public DateTime? UpdatedAt { get; set; } = null;

    public Model()
    {
        this.Id = Guid.NewGuid().ToString();
    }
    
}