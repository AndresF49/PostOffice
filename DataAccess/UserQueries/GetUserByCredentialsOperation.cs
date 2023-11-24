﻿using Dapper;
using PostOffice.Models;
using System.Data.SqlClient;

namespace PostOffice.DataAccess.UserQueries
{
    public class GetUserByCredentialsOperation : IUserOperation
    {
        private IConfiguration _configuration;

        public GetUserByCredentialsOperation(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<User> GetUserByCredentials(User credentials)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {
                var sql = @"
                SELECT UserId FROM Users
                WHERE Email = @Username AND Password = @Password
                ";

                var parameters = new Dictionary<string, object>
                {
                    {"@Username", credentials.Username},
                    {"@Password", credentials.Password}
                };

                var result = await connection.QuerySingleAsync<User>(sql, parameters, commandType: System.Data.CommandType.Text);

                return new User { UserId = result.UserId };

            }
        }
    }
}
