using Dapper;
using PostOffice.DataAccess.Reports.AnnualRevenueReport;
using System.Data;
using System.Data.SqlClient;

namespace PostOffice.DataAccess.Reports.EmployeeProductivityReport
{
    public class GetEmployeeProductivityReportOperation: IGetEmployeeProductivityReportOperation
    {
        private readonly IConfiguration _configuration;

        public GetEmployeeProductivityReportOperation(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public List<GetEmployeeProductivityReportResponse> GetEmployeeProductivityReport(GetEmployeeProductivityReportRequest request)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@StartDate", request.StartDate, DbType.DateTime);
                parameters.Add("@EndDate", request.EndDate, DbType.DateTime);
                parameters.Add("@EmployeeId", request.EmployeeId, DbType.Int32);

                var result = connection.Query<GetEmployeeProductivityReportResponse>("GetEmployeeProductivityReport", parameters, commandType: CommandType.StoredProcedure);

                return result.ToList();
            }
        }
    }
}
