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
	public class Token // returning this token object so frontend destructure this object into a token and email
	{
		public string token { get; set; }
		public User user { get; set; }
	}

	// private readonly int[] _foo = new int[] {0,1,2,3};
	private readonly User[] UserArr = new User[] 
	{ 
		new User { UserId=0, Email="admin@gmail.com", RoleTypeId=0, EmployeeId=0, Username="admin", Password="admin", CustomerId=null },
	 	new User { UserId=1, Email="andres@gmail.com", RoleTypeId=0, EmployeeId=1, Username="andres", Password="andres", CustomerId=null },
		new User { UserId=2, Email="employee@gmail.com", RoleTypeId=1, EmployeeId=2, Username="employee", Password="employee", CustomerId=null },
		new User { UserId=3, Email="customer@gmail.com", RoleTypeId=2, EmployeeId=null, Username="customer", Password="customer", CustomerId=0 }
	};
	
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
		// query db where credentials.email == db.email && Hash(credentials.password) == db.hashedPassword
		var user = UserArr.Single<User>(u => u.Email == credentials.email && u.Password == credentials.password);
		// NEEDS TO BE HASHED PASSWORD ^^^^ and SWITCH frontend to take a Username when logging in/registering instead
		// of an email
		var tokenObj = new Token { token = "test123", user = user };
  //      Console.WriteLine("In Post method for login:");
  //      Console.WriteLine("Email: " + credentials.email);
  //      Console.WriteLine("Pass: " + credentials.password);
  //      Console.WriteLine("Token: " + tokenObj);
		//Console.WriteLine("JSONed Token: " + JsonSerializer.Serialize(tokenObj));

        return Ok(JsonSerializer.Serialize(tokenObj));
	}
}

