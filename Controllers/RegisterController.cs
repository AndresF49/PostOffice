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
    private readonly IRegistrationOperation _registration;
    private readonly IUserOperation _userOperation;
    // private int userId;

    public RegisterController(IRegistrationOperation registration, IUserOperation userOperation)
    {
        _registration = registration;
        _userOperation = userOperation;
    }
    public class Token
    {
        public Guid token { get; set; }
        public int userRoleTypeId { get; set; }
        public int userId { get; set; }
    }
    private class CustomError
    {
        public string error { get; set; }
    }
    [HttpPost]
    [Route("CreateUser")]
    public  ActionResult<int> CreateUser([FromBody] User credentials)
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
            var user = _userOperation.GetUserIdByCredentials(credentials).Result;
            // userId = user.UserId;

            return Ok(JsonSerializer.Serialize(user.UserId));
        }
    }
    [HttpPost]
    [Route("CreateCustomer")]
    public ActionResult<Token> CreateCustomer([FromBody] Customer customer)
    {
        if (string.IsNullOrEmpty(customer.FirstName)
        || string.IsNullOrEmpty(customer.LastName)
        || string.IsNullOrEmpty(customer.Email))
        {
            return BadRequest("One or more Create Customer credentials is empty");
        }

        _registration.CreateCustomer(customer);
        var customerId = _registration.GetCustomerId(customer);
        _registration.UpdateCustomerIdOnUser(customer.UserId, customerId);

        var user = _userOperation.GetUserByUserId(customer.UserId);

        var token = new Token { token = Guid.NewGuid(), userId=user.UserId, userRoleTypeId=user.RoleTypeId };

        return Ok(JsonSerializer.Serialize(token));
    }

    [HttpPost]
    [Route("CreateEmployee")]
    public ActionResult CreateEmployee([FromBody] CreateEmployeeRequest request)
    {
        var employeeId = _registration.CreateEmployee(request);
        if (_registration.UpdateEmployeeIdOnUser(request.UserId, employeeId)) {
            return Ok();
        }
        else {
            return BadRequest();
        }
    }
}

