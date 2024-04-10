using System.Collections;
using System.Collections.Immutable;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Mimic.Models;
using Mimic.Lib;
using Mimic.Models.Identities;

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
        public async Task<IActionResult> GetAll()
        {
            Request.Headers.TryGetValue("page", out var pageString);
            Request.Headers.TryGetValue("search_term", out var searchTerm);
            Request.Headers.TryGetValue("page_size", out var pageSizeString);
            Request.Headers.TryGetValue("sort_by", out var sortByString);
            Request.Headers.TryGetValue("sort_dir", out var sortDirection);
            
            var page = Int32.Parse(pageString.FirstOrDefault("0"));
            var pageSize = Int32.Parse(pageSizeString.FirstOrDefault("10"));
            var sortBy = sortByString.FirstOrDefault("Name");
            
            var r = _context.Roles;

            IQueryable<UserRole> s;
            
            //TODO Add searching here
            if (!string.IsNullOrEmpty(searchTerm))
            {
                s = r.Where(t => t.Name.ToLower().Contains(searchTerm.ToString().ToLower()) || t.NormalizedName.ToLower().Contains(searchTerm.ToString().ToLower()) || t.Id == searchTerm.ToString());
            }
            else
            {
                s = r;
            }
            
            IOrderedQueryable<UserRole> sorted;
            if (!string.IsNullOrEmpty(sortDirection) && sortDirection == "asc")
            {
                sorted = s.OrderByDescending(item => item.Name);
            }
            else
            {
                sorted = s.OrderByDescending(item => item.Name);
            }
            
            var count = s.Count();
            var totalPages = (Int32)Math.Ceiling((float)count / (float)pageSize);
            
            var rs = sorted.Paginate(pageSize * page, pageSize);

            foreach (var role in rs)
            {
                role.Count = _context.UserRoles.Count(userRole => userRole.RoleId == role.Id);
            }

            var output = new PaginatedResponse<UserRole>
            {
                totalPages = totalPages,
                data = rs
            };
            
            return StatusCode((int)HttpStatusCode.OK, output);
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
            if (role.Name == null)
            {
                return BadRequest();
            }

            if (role.NormalizedName == null)
            {
                role.NormalizedName = role.Name.ToUpper();
            }
            
            var nRole = _context.Roles.Add(role);
            _context.SaveChanges();
            
            return StatusCode((int)HttpStatusCode.OK, nRole.ToString());
        }
    }
}
