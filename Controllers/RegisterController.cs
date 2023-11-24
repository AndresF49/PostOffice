using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using PostOffice.DataAccess.Registration;
using PostOffice.DataAccess.UserQueries;
using PostOffice.Models;

namespace PostOffice.Controllers;

[ApiController]
[Route("[controller]")]
public class RegisterController : ControllerBase
{

	private readonly ILogger<RegisterController> _logger;
	private readonly IRegistrationOperation _registration;
    private readonly IUserOperation _userOperation;
	private int userId;

	public RegisterController(ILogger<RegisterController> logger,
		IRegistrationOperation registration,
		IUserOperation userOperation
		)
	{
		_logger = logger;
		_registration = registration;
		_userOperation = userOperation;
		CustomersArray.CustomerArr.First<Customer>().User = UsersArray.UserArr[3]; // REMOVE IN PROD
	}
	public class Token
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
	public async Task<IActionResult> CreateUser([FromBody] User credentials)
	{
		if (string.IsNullOrEmpty(credentials.Username) || string.IsNullOrEmpty(credentials.Password))
		{
			return BadRequest(new CustomError { error="One or more Create User credentials is empty" });
		}

		var existentialCheck = _registration.CheckUserExistance(credentials);

		if (existentialCheck)
		{
			return BadRequest(new CustomError { error="Username already exists" });
		}
		else
		{
			_registration.CreateUser(credentials);
			var user = _userOperation.GetUserByCredentials(credentials).Result;
			userId = user.UserId;

            return Ok(JsonSerializer.Serialize(user));
        }
    }
	[HttpPost]
	[Route("CreateCustomer")]
	public async Task<IActionResult> CreateCustomer([FromBody] Customer customer)
	{
		if (string.IsNullOrEmpty(customer.FirstName) 
		|| string.IsNullOrEmpty(customer.LastName) 
		|| string.IsNullOrEmpty(customer.Email))
		{
			return BadRequest("One or more Create Customer credentials is empty");
		}

		_registration.CreateCustomer(customer);
		var customerId = _registration.GetCustomerId(customer);
		_registration.UpdateCustomerIdOnUser(userId, customerId);

		
		var tokenObj = new Token { token="token123", user=new User() };

        return Ok(JsonSerializer.Serialize(tokenObj));
	}
}

