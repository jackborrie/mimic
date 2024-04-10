namespace Mimic.Models;

public class PaginatedResponse<T>
{

    public int totalPages { get; set; } = 0;
    public List<T> data { get; set; } = new List<T>();

}