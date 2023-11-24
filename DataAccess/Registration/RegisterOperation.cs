using Dapper;
using PostOffice.Models;
using System.Data.SqlClient;

namespace PostOffice.DataAccess.Registration
{
    public class Registration : IRegistrationOperation
    {
        private readonly IConfiguration _configuration;

        public Registration(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public bool CheckUserExistance(User user)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {
                var sql = @"
                SELECT * FROM Users
                WHERE Username = @Username
                ";

                var parameters = new Dictionary<string, object>
                {
                    {"@Username", user.Username},
                };

                var result = connection.QueryFirstOrDefault(sql, parameters, commandType: System.Data.CommandType.Text);

                if (result > 0) { return true; } else { return false; }
            }
        }

        public bool CreateUser(User user)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {
                var sql = @"
                INSERT INTO Users(
                    Username,
                    Password,
                    RoleTypeId)
                VALUES(
                    @Username,
                    @Password,
                    2
                ";

                var parameters = new Dictionary<string, object>
                {
                    {"@Username", user.Username},
                    {"@Password", user.Password}
                };

                var result = connection.Execute(sql, parameters, commandType: System.Data.CommandType.Text);

                if (result > 0){return true;} else {return false;}
            }
        }

        public bool CreateCustomer(Customer customer)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {
                var sql = @"
                INSERT INTO Customer(
                    FirstName,
                    MiddleInitial,
                    LastName,
                    PhoneNumber,
                    Email)
                VALUES(
                    @FirstName,
                    @MiddleInnitial,
                    @LastName,
                    @PhoneNumber,
                    @Email)
                ";

                var parameters = new Dictionary<string, object>
                {
                    {"@FirstName", customer.FirstName},
                    {"@MiddleInitial", customer.MiddleInitial},
                    {"@LastName", customer.LastName},
                    {"@PhoneNumber", customer.PhoneNumber},
                    {"@Email", customer.Email}
                };

                var result = connection.Execute(sql, parameters, commandType: System.Data.CommandType.Text);

                if (result > 0) { return true; } else { return false; }
            }
        }

        public int GetCustomerId(Customer customer)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {
                var sql = @"
                SELECT CustomerId 
                FROM Customer 
                WHERE FirstName = @FirstName 
                    AND LastName = @LastName 
                    AND PhoneNumber = @PhoneNumber 
                    AND Email = @Email";

                var parameters = new Dictionary<string, object>
                {
                    {"@FirstName", customer.FirstName},
                    {"@MiddleInitial", customer.MiddleInitial},
                    {"@LastName", customer.LastName},
                    {"@PhoneNumber", customer.PhoneNumber},
                    {"@Email", customer.Email}
                };

                return connection.QueryFirstOrDefault<int>(sql, parameters, commandType: System.Data.CommandType.Text);
            }
        }

        public bool UpdateCustomerIdOnUser(int userId, int customerId)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {
                var sql = @"
                UPDATE User
                SET CustomerId = @CustomerId
                WHERE UserId = @UserId
                ";

                var parameters = new Dictionary<string, object>
                {
                    {"@CustomerId", customerId},
                    {"@UserId", userId}
                };
                var registrationCheck = connection.Execute(sql, parameters, commandType: System.Data.CommandType.Text);

                if (registrationCheck > 0){return true;}else{return false;}
            }

        }
    }
}
