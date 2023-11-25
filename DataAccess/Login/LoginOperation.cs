using System.Data.SqlClient;
using Dapper;
using PostOffice.Models;

namespace PostOffice.DataAccess.Login
{
    public class LoginOperation : ILoginOperation
    {
        private readonly IConfiguration _configuration;

        public LoginOperation(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public User LoginAsync(LoginCredentials credentials)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {
                var sql = @"
                SELECT 1 FROM Users
                WHERE Email = @Username AND Password = @Password
                ";

                var parameters = new Dictionary<string, object>
                {
                    {"@Username", credentials.Username},
                    {"@Password", credentials.Password}
                };

                var result = connection.QueryFirstOrDefault<User>(sql, parameters, commandType: System.Data.CommandType.Text);

                return new User
                {
                    UserId = result.UserId,
                    Username = result.Username,
                    RoleTypeId = result.RoleTypeId
                };
            }
        }
    }
}