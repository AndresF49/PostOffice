using Dapper;
using PostOffice.Models;
using System.Data.SqlClient;

namespace PostOffice.DataAccess.UserQueries
{
    public class UserOperation : IUserOperation
    {
        private IConfiguration _configuration;

        public UserOperation(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<User> GetUserIdByCredentials(User credentials)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {
                var sql = @"
                SELECT * FROM Users
                WHERE Username = @Username AND Password = @Password
                ";

                var parameters = new Dictionary<string, object>
                {
                    {"@Username", credentials.Username},
                    {"@Password", credentials.Password}
                };

                var result = await connection.QuerySingleAsync<User>(sql, parameters, commandType: System.Data.CommandType.Text);

                return new User { UserId = result.UserId, Username = result.Username, RoleTypeId = result.RoleTypeId };

            }
        }

        public async Task<User> GetUserByUserId(int userId)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {
                var sql = @"
                SELECT * FROM Users
                WHERE UserId = @UserId
                ";

                var parameters = new Dictionary<string, object>
                {
                    {"@UserId", userId},
                };

                var result = await connection.QuerySingleAsync<User>(sql, parameters, commandType: System.Data.CommandType.Text);

                return new User { UserId = result.UserId, Username = result.Username, RoleTypeId = result.RoleTypeId };

            }
        }
    }
}
