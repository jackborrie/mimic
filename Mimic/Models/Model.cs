using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Data.SQLite;
using System.Text.Json.Serialization;
using Mimic.Attributes;
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
    
    public abstract void AdditionalParse();

    public Dictionary<string, object> ConvertToDictionary()
    {
        var outputDict = new Dictionary<string, object>();
        var objProperties = this.GetType().GetProperties();
        
        foreach (var property in objProperties)
        {
            var column = property.GetColumn();
            
            if (string.IsNullOrEmpty(column))
            {
                continue;
            }

            var value = property.GetValue(this);

            if (value == null)
            {
                continue;
            }

            if (property.CanWrite)
            {
                outputDict.Add(column, value);
            }
        }

        return outputDict;
    }
    
}