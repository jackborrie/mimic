using System.Collections;
using System.Net;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Mimic.Models;

namespace Mimic.Controllers
{
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> _logger;
        private readonly MimicContext _context;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;

        public AuthController(ILogger<AuthController> logger,
            MimicContext context,
            SignInManager<User> signInManager,
            UserManager<User> userManager)
        {
            _logger = logger;
            _context = context;
            _signInManager = signInManager;
            _userManager = userManager;
        }
        
        [HttpPost("auth/register")]
        public async Task<ActionResult> RegisterUser(RegistrationUser user)
        {

            IdentityResult result;

            try {
                var u = new User(){
                    Email = user.Email,
                    UserName = user.Username,
                };

                result = await _userManager.CreateAsync(u, user.Password);

                if(!result.Succeeded){
                    return BadRequest(result);
                }
            } catch(Exception ex) {
                if (ex.InnerException.Message.Contains("Unique_Email"))
                {
                    return BadRequest(IdentityResult.Failed(new IdentityError[]{new IdentityError
                    {
                        Code = "0001",
                        Description = "Duplicate email"
                    }}));
                }
                if (ex.InnerException.Message.Contains("Unique_Username"))
                {
                    return BadRequest(IdentityResult.Failed(new IdentityError[]{new IdentityError
                    {
                        Code = "0001",
                        Description = "Duplicate username"
                    }}));
                }
                
                return BadRequest("Something went wrong, please try again. " + ex.InnerException.Message);
            }

            return Ok(new { message = "Registered Successfully.", result });
        }

        [HttpGet("status")]
        [Authorize]
        public async Task<IActionResult> Status()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }

            var user = _context.Users.FirstOrDefault(user => user.Id == userId.Value);

            if (user == null)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }

            // Use registration user as it has minimal things
            var userCopy = new MinimumUser()
            {
                Email = user.Email,
                Username = user.UserName
            };

            var status = new Status
            {
                User = userCopy
            };

            return StatusCode((int)HttpStatusCode.OK, status);
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            return StatusCode((int)HttpStatusCode.OK);
        }
    }
}