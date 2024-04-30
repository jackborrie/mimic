namespace Mimic.Attributes;

[AttributeUsage(AttributeTargets.All/*, AllowMultiple = true*/)]
public class ColumnName : Attribute
{
    string Column;

    public ColumnName(string column)
    {
        this.Column = column;
    }

    public string GetColumn() => Column;
}