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

        public async Task<bool> LoginAsync(LoginCredentials credentials)
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

                var result = await connection.QueryAsync(sql, parameters, commandType: System.Data.CommandType.Text);

                result.Count();


                if (result.Count() > 1)
                {
                    return true;
                }
                else 
                { 
                    return false; 
                }
            }
        }
    }
}