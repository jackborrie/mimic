using System.Collections;
using System.Net;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mimic.Models;

namespace Mimic.Controllers
{
    
    [ApiController]
    [Route("api/user")]
    public class UserController : BaseController
    {
        private readonly ILogger<UserController> _logger;
        private readonly MimicContext _context;

        public UserController(ILogger<UserController> logger, MimicContext context, UserManager<User> userManager, RoleManager<UserRole> roleManager): base(userManager, roleManager)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet(Name = "all_users")]
        public IActionResult GetAll()
        {
            var users = _context.Users.ToArray();
            return StatusCode((int)HttpStatusCode.OK, users);
        }

        [HttpGet("{id}")]
        [Authorize]
        public IActionResult Get(string id)
        {
            var user = _context.Users.FirstOrDefault(user => user.Id == id);

            if (user == null)
            {
                return StatusCode((int)HttpStatusCode.BadRequest, "User already has an ID");
            }

            return StatusCode((int)HttpStatusCode.OK, user);
        }

        [HttpPut("{id}")]
        [Authorize]
        public IActionResult Update(string id, User user)
        {
            var foundUser = _context.Users.Where(u => u.Id == id).FirstOrDefault();

            if (foundUser == null)
            {
                return StatusCode((int)HttpStatusCode.NotFound, "User with ID [" + id + "] does not exist.");
            }

            // foundUser.Username = user.Username;
            // foundUser.Email = user.Email;

            _context.Users.Update(foundUser);
            _context.SaveChanges();

            return StatusCode((int)HttpStatusCode.OK, foundUser);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(string id)
        {
            var foundUser = _context.Users.Where(u => u.Id == id).FirstOrDefault();

            if (foundUser == null)
            {
                return StatusCode((int)HttpStatusCode.NotFound, "User with ID [" + id + "] does not exist.");
            }

            _context.Users.Remove(foundUser);
            _context.SaveChanges();

            return StatusCode((int)HttpStatusCode.OK, foundUser);
        }

        [HttpPost("{userId}/role/{roleId}")]
        public async Task<IActionResult> AssignRole(string userId, string roleId)
        {
            var foundUser = _context.Users.Where(u => u.Id == userId).FirstOrDefault();

            if (foundUser == null)
            {
                return StatusCode((int)HttpStatusCode.NotFound, "User with ID [" + userId + "] does not exist.");
            }

            var foundRole = _context.Roles.Where(u => u.Id == roleId).FirstOrDefault();

            if (foundRole == null)
            {
                return StatusCode((int)HttpStatusCode.NotFound, "Role with ID [" + roleId + "] does not exist.");
            }
            
            Console.WriteLine(foundRole.Name);
            
            var ir = await userManager.AddToRoleAsync(foundUser, foundRole.Name);

            return StatusCode((int)HttpStatusCode.OK, ir.ToString());
        }
    }
}