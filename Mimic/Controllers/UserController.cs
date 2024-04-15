using System.Collections;
using System.Net;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mimic.Lib;
using Mimic.Models;
using Mimic.Models.Identities;

namespace Mimic.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : BaseController
    {
        private readonly ILogger<UserController> _logger;
        private readonly MimicContext _context;

        public UserController(ILogger<UserController> logger, MimicContext context, UserManager<User> userManager,
            RoleManager<UserRole> roleManager) : base(userManager, roleManager)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet(Name = "all_users")]
        [Authorize(Roles = "admin:read,admin:write")]
        public IActionResult GetAll()
        {
            Request.Headers.TryGetValue("page", out var pageString);
            Request.Headers.TryGetValue("search_term", out var searchTerm);
            Request.Headers.TryGetValue("page_size", out var pageSizeString);
            Request.Headers.TryGetValue("sort_by", out var sortByString);
            Request.Headers.TryGetValue("sort_dir", out var sortDirection);

            var page = Int32.Parse(pageString.FirstOrDefault("0"));
            var pageSize = Int32.Parse(pageSizeString.FirstOrDefault("10"));
            var sortBy = sortByString.FirstOrDefault("Username");

            var r = _context.Users;

            IQueryable<User> s;

            //TODO Add searching here
            if (!string.IsNullOrEmpty(searchTerm))
            {
                s = r.Where(t => t.UserName.ToLower().Contains(searchTerm.ToString().ToLower()) ||
                                 t.NormalizedUserName.ToLower().Contains(searchTerm.ToString().ToLower()) ||
                                 t.Id == searchTerm.ToString() ||
                                 t.Email.ToLower().Contains(searchTerm.ToString().ToLower()) ||
                                 t.NormalizedEmail.ToLower().Contains(searchTerm.ToString()));
            }
            else
            {
                s = r;
            }

            IOrderedQueryable<User> sorted;
            if (!string.IsNullOrEmpty(sortDirection) && sortDirection == "asc")
            {
                sorted = s.OrderByDescending(item => item.UserName);
            }
            else
            {
                sorted = s.OrderByDescending(item => item.UserName);
            }

            var count = s.Count();
            var totalPages = (Int32)Math.Ceiling((float)count / (float)pageSize);

            var rs = sorted.Paginate(pageSize * page, pageSize);

                var output = new PaginatedResponse<User>
            {
                totalPages = totalPages,
                data = rs
            };

            return StatusCode((int)HttpStatusCode.OK, output);
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