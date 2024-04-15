using Mimic.Models.Identities;

namespace Mimic.Models;

public class Account: BaseModel
{
    
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string AccountType { get; set; } = string.Empty;

    public List<Transaction> Transactions = new List<Transaction>();
    public List<User> Users = new List<User>();

}