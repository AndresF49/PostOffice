namespace PostOffice.DataAccess.Reports.PostOfficeRevenueReport
{
    public interface IGetPostOfficeRevenueReportOperation
    {
        Task<List<GetPostOfficeRevenueReportResponse>> GetPostOfficeRevenueReport(GetPostOfficeRevenueReportRequest request);
    }
}
