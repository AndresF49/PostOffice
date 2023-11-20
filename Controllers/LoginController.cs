using System.Net;
using System.Text.Json;
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
	public class Token
	{
		public string token { get; set; }
		public string email { get; set; }
	}
	[HttpPost]
	[Route("Login")]
	public async Task<IActionResult> Login([FromBody] LoginCredentials credentials) // By default, Web API tries to get simple types from the request URI. The FromBody attribute tells Web API to read the value from the request body.
	{
		if (string.IsNullOrEmpty(credentials.email) || string.IsNullOrEmpty(credentials.password))
		{
			Console.WriteLine("email or pass null/emp");
			return BadRequest("One or more Login credentials is empty");
		}

		
		await Task.Run(() => Thread.Sleep(100));
		var tokenObj = new Token { token = "test123", email = credentials.email };
		//var token = "test123";
        Console.WriteLine("In Post method for login:");
        Console.WriteLine("Email: " + credentials.email);
        Console.WriteLine("Pass: " + credentials.password);
        Console.WriteLine("Token: " + tokenObj);
		Console.WriteLine("JSONed Token: " + JsonSerializer.Serialize(tokenObj));

        return Ok(JsonSerializer.Serialize(tokenObj));
		//return Ok(token);
	}
    //[HttpGet]
    //[Route("GetLogin")]
    //public IActionResult GetLogin() // By default, Web API tries to get simple types from the request URI. The FromBody attribute tells Web API to read the value from the request body.
    //{

    //    Console.WriteLine("In Get method for login:");

    //    Console.WriteLine();

    //    var token = "test123";

    //    return Ok(JsonSerializer.Serialize(token));
    //}

}

