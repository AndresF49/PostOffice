using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using PostOffice.DataAccess.Login;
using PostOffice.DataAccess.UserQueries;
using PostOffice.Models;

namespace PostOffice.Controllers;

[ApiController]
[Route("[controller]")]
public class LoginController : ControllerBase
{
    private readonly ILoginOperation _login;

    public LoginController(ILoginOperation login)
    {
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

        var user = _login.LoginAsync(credentials);

        if (!string.IsNullOrEmpty(user.Username))
        {
            var tokenObj = new Token { token = "test123", user = user };

            return Ok(JsonSerializer.Serialize(tokenObj));
        }
        else
        {
            Console.WriteLine("Invalid Username or Password");
            return Ok();
        }
    }
}

