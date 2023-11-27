using Dapper;
using System.Data;
using System.Data.SqlClient;

namespace PostOffice.DataAccess.Reports.AnnualRevenueReport
{
    public class GetAnnualRevenueReportOperation : IGetAnnualRevenueReportOperation
    {
        private readonly IConfiguration _configuration;
        public GetAnnualRevenueReportOperation(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public List<GetAnnualRevenueReportResponse> GetAnunalRevenueReport(GetAnnualRevenueReportRequest request)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@StartDate", request.StartDate, DbType.DateTime);
                parameters.Add("@EndDate", request.EndDate, DbType.DateTime);

                var result = connection.Query<GetAnnualRevenueReportResponse>("GetAnnualRevenueReport", parameters, commandType: CommandType.StoredProcedure);

                return result.ToList();
            }
        }
    }
}
