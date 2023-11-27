using Dapper;
using PostOffice.Models;
using System.Data;
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

                var result = connection.QueryFirstOrDefault<User>(sql, parameters, commandType: CommandType.Text);

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

                var result = connection.Execute(sql, parameters, commandType: CommandType.Text);

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


                var result = connection.Execute(sql, parameters, commandType: CommandType.Text);

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


                return connection.QueryFirstOrDefault<int>(sql, parameters, commandType: CommandType.Text);
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
                var registrationCheck = connection.Execute(sql, parameters, commandType: CommandType.Text);

                if (registrationCheck > 0){return true;}else{return false;}
            }

        }

        public int CreateEmployee(CreateEmployeeRequest employee)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {

                var postmasterIdSql = @"
                SELECT PM.PostMasterId
                FROM Users U
                JOIN Employees E ON U.UserId = E.UserId
                LEFT JOIN PostMasters PM ON E.EmployeeId = PM.EmployeeId
                LEFT JOIN PostOffices PO ON PM.PostMasterId = PO.PostMasterId
                WHERE U.UserId = @UserId;
                ";
                var postOfficeIdSql = @"
                SELECT PO.PostOfficeId
                FROM Users U
                JOIN Employees E ON U.UserId = E.UserId
                LEFT JOIN PostMasters PM ON E.EmployeeId = PM.EmployeeId
                LEFT JOIN PostOffices PO ON PM.PostMasterId = PO.PostMasterId
                WHERE U.UserId = @UserId;
                ";
                
                var userIdParameters = new Dictionary<string, object>
                {
                    {"@UserId", employee.AdminUserId }
                };

                employee.PostMasterId = connection.QueryFirstOrDefault(postmasterIdSql, userIdParameters, commandType: CommandType.Text).PostMasterId;
                employee.PostOfficeId = connection.QueryFirstOrDefault(postOfficeIdSql, userIdParameters, commandType: CommandType.Text).PostOfficeId;


                var sql = @"
                INSERT INTO Employees
                (
                    Ssn,
                    FirstName,
                    MiddleInitial,
                    LastName,
                    PhoneNumber,
                    Email,
                    RoleTypeId,
                    Salary,
                    DateOfBirth,
                    StartDate,
                    UserId,
                    PostOfficeId,
                    PostMasterId
                )
                VALUES
                (
                    @Ssn,
                    @FirstName,
                    @MiddleInitial,
                    @LastName,
                    @PhoneNumber,
                    @Email,
                    @RoleTypeId,
                    @Salary,
                    @DateOfBirth,
                    @StartDate,
                    @UserId,
                    @PostOfficeId,
                    @PostMasterId
                )";

                var parameters = new Dictionary<string, object>
                {
                    {"@Ssn", employee.Ssn },
                    {"@FirstName", employee.FirstName },
                    {"@MiddleInitial", employee.MiddleInitial },
                    {"@LastName", employee.LastName },
                    {"@PhoneNumber", employee.PhoneNumber },
                    {"@Email", employee.Email },
                    {"@RoleTypeId", employee.RoleTypeId },
                    {"@Salary", employee.Salary },
                    {"@DateOfBirth", employee.DateOfBirth },
                    {"@StartDate", employee.StartDate },
                    {"@UserId", employee.UserId },
                    {"@PostOfficeId", employee.PostOfficeId },
                    {"@PostMasterId", employee.PostMasterId }
                };

                connection.Execute(sql, parameters, commandType: CommandType.Text);

                var sqlGetEmployee = @"
                    SELECT EmployeeId
                    FROM Employees
                    WHERE Ssn=@Ssn
                ";

                var getEmployeeParameters = new Dictionary<string, object>
                {
                    {"@Ssn", employee.Ssn},
                };

                return connection.QueryFirstOrDefault<int>(sqlGetEmployee, getEmployeeParameters, commandType: CommandType.Text);
            }
        }

        public bool UpdateEmployeeIdOnUser(int userId, int employeeId)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {
                var sql = @"
                UPDATE Users
                SET EmployeeId = @EmployeeId
                WHERE UserId = @UserId
                ";

                var parameters = new Dictionary<string, object>
                {
                    {"@EmployeeId", employeeId},
                    {"@UserId", userId}
                };
                var registrationCheck = connection.Execute(sql, parameters, commandType: CommandType.Text);

                return registrationCheck > 0;
            }
        }

    }
}
