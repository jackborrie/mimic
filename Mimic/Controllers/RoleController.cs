using System.Collections;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Mimic.Models;

namespace Mimic.Controllers
{
    [ApiController]
    [Route("auth/roles")]
    public class RoleController : BaseController
    {

        private readonly ILogger<RoleController> _logger;
        private readonly MimicContext _context;

        public RoleController(ILogger<RoleController> logger, MimicContext context, UserManager<User> userManager, RoleManager<UserRole> roleManager): base(userManager, roleManager)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet(Name = "all_roles")]
        [Authorize(Roles = "admin:read,admin:write")]
        public IActionResult GetAll()
        {
            return StatusCode((int)HttpStatusCode.OK, _context.Roles.ToArray());
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "admin:read,admin:write")]
        public IActionResult GetOne()
        {
            return StatusCode((int)HttpStatusCode.OK, _context.Roles.ToArray());
        }

        [HttpPost]
        public IActionResult CreateRole(UserRole role)
        {
            var nRole = _context.Roles.Add(role);
            _context.SaveChanges();
            
            return StatusCode((int)HttpStatusCode.OK, nRole.ToString());
        }
    }
}
