using Dapper;
using PostOffice.Models;
using System.Data.SqlClient;

namespace PostOffice.DataAccess.Registration
{
    public class RegistrationOperation : IRegistrationOperation
    {
        private readonly IConfiguration _configuration;

        public RegistrationOperation(IConfiguration configuration)
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

                var result = connection.QueryFirstOrDefault<User>(sql, parameters, commandType: System.Data.CommandType.Text);

                return result != null ? true : false;
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
                    Email,
                    RoleTypeId)
                VALUES(
                    @Username,
                    @Password,
                    @Email,
                    3)
                ";

                var parameters = new Dictionary<string, object>
                {
                    {"@Username", user.Username},
                    {"@Password", user.Password},
                    {"@Email", user.Email }
                };

                var result = connection.Execute(sql, parameters, commandType: System.Data.CommandType.Text);

                return result > 0 ? true : false;
            }
        }

        public bool CreateCustomer(Customer customer)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {
                var sql = @"
                INSERT INTO Customers(
                    FirstName,
                    MiddleInitial,
                    LastName,
                    PhoneNumber,
                    Email,
                    UserId)
                VALUES(
                    @FirstName,
                    @MiddleInitial,
                    @LastName,
                    @PhoneNumber,
                    @Email,
                    @UserId)
                ";

                var parameters = new Dictionary<string, object>
                {
                    {"@FirstName", customer.FirstName},
                    {"@LastName", customer.LastName},
                    {"@Email", customer.Email},
                    {"@UserId", customer.UserId}
                };

                var middleInitial = customer.MiddleInitial != null ? customer.MiddleInitial : null;
                var phoneNumber = customer.PhoneNumber != null ? customer.PhoneNumber : "NULL";

                parameters.Add("@MiddleInitial", middleInitial);
                parameters.Add("@PhoneNumber", phoneNumber);


                var result = connection.Execute(sql, parameters, commandType: System.Data.CommandType.Text);

                return result > 0 ? true : false;
            }
        }

        public int GetCustomerId(Customer customer)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {
                var sql = @"
                SELECT CustomerId 
                FROM Customers 
                WHERE FirstName = @FirstName 
                    AND LastName = @LastName 
                    AND Email = @Email";

                var parameters = new Dictionary<string, object>
                {
                    {"@FirstName", customer.FirstName},
                    {"@LastName", customer.LastName},
                    {"@Email", customer.Email}
                };

                var middleInitial = customer.MiddleInitial != null ? customer.MiddleInitial : null;

                parameters.Add("@MiddleInitial", middleInitial);


                return connection.QueryFirstOrDefault<int>(sql, parameters, commandType: System.Data.CommandType.Text);
            }
        }

        public bool UpdateCustomerIdOnUser(int userId, int customerId)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {
                var sql = @"
                UPDATE Users
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
