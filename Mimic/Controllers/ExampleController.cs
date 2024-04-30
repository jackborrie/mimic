using System.Collections;
using Microsoft.AspNetCore.Mvc;

namespace Mimic.Controllers
{
    [ApiController]
    [Route("api/example")]
    public class ExampleController : ControllerBase
    {

        // private readonly ILogger<UserController> _logger;

        // public ExampleController(ILogger<UserController> logger)
        // {
        //     _logger = logger;
        // }

        // [HttpGet(Name = "all")]
        // public IEnumerable<User> GetAll()
        // {
        //     return Enumerable.Range(1, 5).Select(index => new User
        //     {
        //         Username = "bruh"
        //     })
        //     .ToArray();
        // }
        //
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
