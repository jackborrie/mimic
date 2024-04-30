namespace Mimic.Attributes;

[AttributeUsage(AttributeTargets.All/*, AllowMultiple = true*/)]
public class TableName : Attribute
{
    string Table;

    public TableName(string table)
    {
        this.Table = table;
    }

    public string GetTableName() => Table;
}