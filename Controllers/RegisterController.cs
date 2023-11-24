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
		CustomersArray.CustomerArr.First<Customer>().User = UsersArray.UserArr[3]; // REMOVE IN PROD
	}
	public class CreateUserCredentials
	{
		public string Username { get; set; }
		public string Password { get; set; }
		public int RoleTypeId { get; set; }
	}
	public class UserObject
	{
		public int UserId { get; set; }
	}
	public class CreateCustomerCredentials
	{
		// FirstName: credentials.FirstName,
        // MiddleInitial: credentials.MiddleInitial ? credentials.MiddleInitial : null,
        // LastName: credentials.LastName,
        // PhoneNumber: credentials.PhoneNumber ? credentials.PhoneNumber : null,
        // Email: credentials.Email,
        // UserId: credentials.UserId,
		public string FirstName { get; set; }
		public char? MiddleInitial { get; set; }
		public string LastName { get; set; }
		public string? PhoneNumber { get; set; }
		public string Email { get; set; }
		public int UserId { get; set; }
	}
	public class Token // returning this token object so frontend destructure this object into a token and user object
	{
		public string token { get; set; }
		public User user { get; set; }
	}
	private class CustomError
	{
		public string error { get; set; }
	}
	[HttpPost]
	[Route("CreateUser")]
	public async Task<IActionResult> CreateUser([FromBody] CreateUserCredentials credentials) // By default, Web API tries to get simple types from the request URI. The FromBody attribute tells Web API to read the value from the request body.
	{
		if (string.IsNullOrEmpty(credentials.Username) || string.IsNullOrEmpty(credentials.Password))
		{
			Console.WriteLine("Username or Password null/emp");
			return BadRequest(new CustomError { error="One or more Create User credentials is empty" });
		}

		// -----REPLACE WITH DB QUERY-----
		await Task.Run(() => Thread.Sleep(100));

		if (UsersArray.UserArr.Any(u => u.Username == credentials.Username)) { // Username already exists
			Console.WriteLine("Username already exists in UsersArray.UserArr");
			return BadRequest(new CustomError { error="Username already exists" });
		}

		var user = new User { UserId=UsersArray.UserArr.Length, Username=credentials.Username, Password=credentials.Password, RoleTypeId=credentials.RoleTypeId };

		// add user to UsersArray ->  REPLACE WITH INSERT INTO `Users`
		UsersArray.UserArr = UsersArray.UserArr.Append(user).ToArray();
		Console.WriteLine($"added user: {user.Username} into UserArr");
		Console.WriteLine($"end of UserArr is {UsersArray.UserArr.Last().Username}");
		
		var userObj = new UserObject { UserId= user.UserId };

        return Ok(JsonSerializer.Serialize(userObj));
	}
	[HttpPost]
	[Route("CreateCustomer")]
	public async Task<IActionResult> CreateCustomer([FromBody] CreateCustomerCredentials credentials) // By default, Web API tries to get simple types from the request URI. The FromBody attribute tells Web API to read the value from the request body.
	{
		if (string.IsNullOrEmpty(credentials.FirstName) 
		|| string.IsNullOrEmpty(credentials.LastName) 
		|| string.IsNullOrEmpty(credentials.Email))
		{
			Console.WriteLine("FirstName, LastName, or Email null/emp");
			return BadRequest("One or more Create Customer credentials is empty");
		}
		
		// -----REPLACE WITH DB QUERY-----
		await Task.Run(() => Thread.Sleep(100));

		var customer = new Customer { 
			CustomerId=CustomersArray.CustomerArr.Length, 
			FirstName=credentials.FirstName, 
			MiddleInitial=credentials.MiddleInitial, 
			LastName=credentials.LastName,
			PhoneNumber=credentials.PhoneNumber,
			Email=credentials.Email,
			User=UsersArray.UserArr[credentials.UserId],
			};

		// add user to CustomerArr ->  REPLACE WITH INSERT INTO `Customer`
		CustomersArray.CustomerArr = CustomersArray.CustomerArr.Append(customer).ToArray();
		// Update User in UserArr to reference this Customer that was created -> UPDATE Users SET CustomerId = customer.CustomerId WHERE UserId = credentials.UserId (or something)
		UsersArray.UserArr[credentials.UserId].CustomerId = customer.CustomerId;
		Console.WriteLine($"added customer: {customer.FirstName} into CustomerArr");
		Console.WriteLine($"end of CustomerArr is {CustomersArray.CustomerArr.Last().FirstName}");

		var user = UsersArray.UserArr[credentials.UserId];
		
		var tokenObj = new Token { token="token123", user=user };

        return Ok(JsonSerializer.Serialize(tokenObj));
	}
}

