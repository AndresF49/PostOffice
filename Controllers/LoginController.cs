using System.Net;
using Microsoft.AspNetCore.Mvc;

namespace PostOffice.Controllers;

[ApiController]
[Route("[controller]")]
public class LoginController : ControllerBase
{

	private readonly ILogger<LoginController> _logger;

	public LoginController(ILogger<LoginController> logger)
	{
		_logger = logger;
	}
	public class LoginCredentials
	{
		public string email { get; set; }
		public string password { get; set; }
	}
	[HttpPost]
	[Route("Login")]
	public IActionResult Login([FromBody] LoginCredentials credentials) // By default, Web API tries to get simple types from the request URI. The FromBody attribute tells Web API to read the value from the request body.
	{
		if (string.IsNullOrEmpty(credentials.email) || string.IsNullOrEmpty(credentials.password))
		{
			return BadRequest("One or more Login credentials is empty");
		}

		Console.WriteLine("In Post method for login:");
		Console.WriteLine(credentials);
		Console.WriteLine();

		var token = "test123";

		return Ok(token);
	}
    [HttpGet]
    [Route("GetLogin")]
    public IActionResult GetLogin() // By default, Web API tries to get simple types from the request URI. The FromBody attribute tells Web API to read the value from the request body.
    {

        Console.WriteLine("In Get method for login:");

        Console.WriteLine();

        var token = "test123";

        return Ok(token);
    }

}

