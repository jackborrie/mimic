using System.Data;
using System.Data.SQLite;
using System.Text.Json.Serialization;
using Mimic.Attributes;
using Mimic.Lib;

namespace Mimic.Models;

public abstract class Model
{
    [JsonPropertyName("id")]
    public string Id { get; set; }

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