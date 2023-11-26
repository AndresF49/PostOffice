using Dapper;
using PostOffice.Models;
using System.Data.SqlClient;

namespace PostOffice.DataAccess.CustomerQueries
{
    public class CustomerOperation : ICustomerOperation
    {
        private IConfiguration _configuration;

        public CustomerOperation(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<Customer>> GetCustomers() {
          using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB"))) 
          {
            var sql = @"
            SELECT *
            FROM Customers
            ";
            
            var result = await connection.QueryAsync<Customer>(sql, commandType: System.Data.CommandType.Text);
            return (List<Customer>)result;
          }
        }
    }
}
