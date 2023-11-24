using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using PostOffice.DataAccess.Login;
using PostOffice.Models;

namespace PostOffice.Controllers;

[ApiController]
[Route("[controller]")]
public class LoginController : ControllerBase
{

	private readonly ILogger<LoginController> _logger;
	private readonly ILoginOperation _login;

	public LoginController(ILogger<LoginController> logger, ILoginOperation login)
	{
		_logger = logger;
		_login = login;
	}
	public class Token
	{
		public string token { get; set; }
		public User user { get; set; }
	}
	
	[HttpPost]
	[Route("Login")]
	public async Task<IActionResult> Login([FromBody] LoginCredentials credentials)
	{
		if (string.IsNullOrEmpty(credentials.Username) || string.IsNullOrEmpty(credentials.Password))
		{
			Console.WriteLine("username or pass null/emp");
			return BadRequest("One or more Login credentials is empty");
		}

		var loginCheck = await _login.LoginAsync(credentials);

		if (loginCheck)
		{
            var tokenObj = new Token { token = "test123", user = new User() };

            return Ok(JsonSerializer.Serialize(tokenObj));
        }
        else
		{
			Console.WriteLine("Invalid Username or Password");
			return Ok();
		}
	}
}

