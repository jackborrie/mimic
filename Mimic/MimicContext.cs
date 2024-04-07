using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Mimic.Models;

namespace Mimic;

public class MimicContext: IdentityDbContext<User>
{
    public MimicContext(DbContextOptions<MimicContext> options) : base(options)
    {
        
    }
    
    public DbSet<User> Users { get; set; }
    public DbSet<UserRole> UserRoles { get; set; }
}