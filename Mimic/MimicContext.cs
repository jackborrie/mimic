using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Mimic.Models;
using Mimic.Models.Identities;

namespace Mimic;

public class MimicContext: IdentityDbContext<User>
{
    public MimicContext(DbContextOptions<MimicContext> options) : base(options)
    {
        
    }
    
    public DbSet<User> Users { get; set; }
    public DbSet<UserRole> Roles { get; set; }
}