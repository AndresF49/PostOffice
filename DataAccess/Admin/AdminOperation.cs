using Dapper;
using PostOffice.Models;
using System.Data;
using System.Data.SqlClient;

namespace PostOffice.DataAccess.Admin
{
    public class AdminOperation : IAdminOperation
    {
        private readonly IConfiguration _configuration;

        public AdminOperation(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void UpdateEmployee(UpdateEmployeeRequest employee)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {
                var sql = @"
                    UPDATE Employees
                    SET 
                        Ssn = @Ssn,
                        FirstName = @FirstName,
                        MiddleInitial = @MiddleInitial,
                        LastName = @LastName,
                        PhoneNumber = @PhoneNumber,
                        Email = @Email,
                        RoleTypeId = @RoleTypeId,
                        Salary = @Salary,
                        DateOfBirth = @DateOfBirth,
                        StartDate = @StartDate,
                        UserId = @UserId,
                        PostOfficeId = @PostOfficeId,
                        PostMasterId = @PostMasterId
                    WHERE EmployeeId = @EmployeeId
                ";

                var parameters = new Dictionary<string, object>
                {
                    {"@EmployeeId", employee.EmployeeId },
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
            }

        }
        public async Task<List<CreateEmployeeRequest>> GetEmployees() {
          using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB"))) 
          {
            var sql = @"
            SELECT *
            FROM Employees
            ";
            
            var result = await connection.QueryAsync<CreateEmployeeRequest>(sql, commandType: System.Data.CommandType.Text);
            return (List<CreateEmployeeRequest>)result;
          }
        }
    }
}
