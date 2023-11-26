using Dapper;
using System.Data.SqlClient;
using System.Data;

namespace PostOffice.DataAccess.Reports.PostOfficeRevenueReport
{
    public class GetPostOfficeRevenueReportOperation : IGetPostOfficeRevenueReportOperation
    {
        private readonly IConfiguration _configuration;
        public GetPostOfficeRevenueReportOperation(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<GetPostOfficeRevenueReportResponse>> GetAnunalRevenueReport(GetPostOfficeRevenueReportRequest request)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@StartDate", request.StartDate, DbType.DateTime);
                parameters.Add("@EndDate", request.EndDate, DbType.DateTime);
                parameters.Add("@PostOfficeId", request.PostOfficeId, DbType.Int32);

                var result = await connection.QueryAsync<GetPostOfficeRevenueReportResponse>("GetPostOfficeRevenue", parameters, commandType: CommandType.StoredProcedure);

                return result.Select(i => new GetPostOfficeRevenueReportResponse()
                {
                    PostOfficeId = i.PostOfficeId,
                    PackageId = i.PackageId,
                    TotalPrice = i.TotalPrice,
                    TotalRevenue = i.TotalRevenue
                }).ToList();
            }
        }
    }
}
