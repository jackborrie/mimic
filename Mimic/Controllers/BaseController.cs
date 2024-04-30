using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace Mimic.Controllers;

public class BaseController : ControllerBase
{

    // protected UserManager<User> userManager;
    // protected RoleManager<UserRole> roleManager;

    // public BaseController(UserManager<User> userManager, RoleManager<UserRole> roleManager)
    // {
    //     this.userManager = userManager;
    //     this.roleManager = roleManager;
    //
    //     // LoadRoles();
    // }
    
    [NonAction]
    protected bool HasReadRole(string role)
    {
        
        return hasAdminRead() ||
               User.IsInRole(role + ":read") ||
               User.IsInRole(role + ":write");
    }

    [NonAction]
    protected bool HasWriteRole(string role)
    {
        return hasAdminWrite() ||
               User.IsInRole(role + ":write");
    }

    [NonAction]
    protected bool hasAdminRead()
    {
        return hasAdminWrite() || User.IsInRole("admin:read");
    }

    [NonAction]
    protected bool hasAdminWrite()
    {
        return User.IsInRole("admin:write");
    }
}