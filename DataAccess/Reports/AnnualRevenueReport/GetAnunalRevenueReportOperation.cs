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

        public async Task<List<GetAnnualRevenueReportResponse>> GetAnunalRevenueReport(GetAnnualRevenueReportRequest request)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@StartDate", request.StartDate, DbType.DateTime);
                parameters.Add("@EndDate", request.EndDate, DbType.DateTime);
                parameters.Add("@PostOfficeId", request.PostOfficeId, DbType.Int32);

                var result = await connection.QueryAsync<GetAnnualRevenueReportResponse>("GetAnnualRevenueReport", parameters, commandType: CommandType.StoredProcedure);

                return result.Select(i => new GetAnnualRevenueReportResponse()
                {
                    PostOfficeId = i.PostOfficeId,
                    PostMasterId = i.PostMasterId,
                    PostMasterName = i.PostMasterName,
                    Year = i.Year,
                    TotalRevenue = i.TotalRevenue
                }).ToList();
            }
        }
    }
}
