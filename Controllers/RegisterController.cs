using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace PostOffice.Controllers;

[ApiController]
[Route("[controller]")]
public class RegisterController : ControllerBase
{

	private readonly ILogger<RegisterController> _logger;

	public RegisterController(ILogger<RegisterController> logger)
	{
		_logger = logger;
	}
	public class LoginCredentials
	{
		public string username { get; set; }
		public string password { get; set; }
	}
	public class Token // returning this token object so frontend destructure this object into a token and user object
	{
		public string token { get; set; }
		public User user { get; set; }
	}
	[HttpPost]
	[Route("Login")]
	public async Task<IActionResult> Login([FromBody] LoginCredentials credentials) // By default, Web API tries to get simple types from the request URI. The FromBody attribute tells Web API to read the value from the request body.
	{
		if (string.IsNullOrEmpty(credentials.username) || string.IsNullOrEmpty(credentials.password))
		{
			Console.WriteLine("username or pass null/emp");
			return BadRequest("One or more Login credentials is empty");
		}
		
		await Task.Run(() => Thread.Sleep(100));
		// query db where credentials.username == db.username && Hash(credentials.password) == db.hashedPassword
		var user = UsersArray.UserArr.Single<User>(u => u.Username == credentials.username && u.Password == credentials.password);
		// NEEDS TO BE HASHED PASSWORD ^^^^ and SWITCH frontend to take a Username when logging in/registering instead
		// of an email
		var tokenObj = new Token { token = "test123", user = user };
  //      Console.WriteLine("In Post method for login:");
  //      Console.WriteLine("Username: " + credentials.username);
  //      Console.WriteLine("Pass: " + credentials.password);
  //      Console.WriteLine("Token: " + tokenObj);
		//Console.WriteLine("JSONed Token: " + JsonSerializer.Serialize(tokenObj));

        return Ok(JsonSerializer.Serialize(tokenObj));
	}
}

