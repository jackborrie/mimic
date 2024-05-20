using System.Collections;
using Microsoft.AspNetCore.Mvc;
using Mimic.Models;

namespace Mimic.Controllers
{
    [ApiController]
    [Route("api/tags")]
    public class TagController : ControllerBase
    {
        private readonly MimicContext _context;

        private readonly ILogger<TagController> _logger;

        public TagController(
            ILogger<TagController> logger,
            MimicContext context
            )
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public ActionResult GetAll()
        {
            var tags = _context.Tags.ToList();

            var filtered = new FilteredData<Tag>();
            filtered.Data = tags;
            filtered.TotalPages = 1;
            
            return Ok(filtered);
        }
        
        // [HttpGet("{id}")]
        // public IEnumerable<User> Get()
        // {
        //     return Enumerable.Range(1, 5).Select(index => new User
        //         {
        //             Username = "bruh"
        //         })
        //         .ToArray();
        // }
    }
}
