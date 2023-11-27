using Dapper;
using System.Data.SqlClient;
using System.Data;

namespace PostOffice.DataAccess.Reports.WorkforceOptimizationReport
{
    public class GetWorkforceOptimizationReportOperation : IGetWorkforceOptimizationReportOperation
    {
        private readonly IConfiguration _configuration;
        public GetWorkforceOptimizationReportOperation(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public List<GetWorkforceOptimizationReportResponse> GetWorkforceOptimizationReport()
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {
                var sql = @"
                SELECT
                    PO.PostOfficeId,
                    COUNT(P.PackageId) AS PackageCount,
                    COUNT(E.EmployeeId) AS EmployeeCount
                FROM
                    PostOffices PO
                    LEFT JOIN Packages P ON PO.PostOfficeId = P.PostOfficeId
                    LEFT JOIN Employees E ON PO.PostOfficeId = E.PostOfficeId
                GROUP BY
                    PO.PostOfficeId
                ORDER BY
                    PO.PostOfficeId
                ";
                var result = connection.Query<GetWorkforceOptimizationReportResponse>(sql, commandType: CommandType.Text);

                return result.ToList();
            }
        }
    }
}
