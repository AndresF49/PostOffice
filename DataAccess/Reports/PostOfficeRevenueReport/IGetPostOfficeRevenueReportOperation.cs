namespace PostOffice.DataAccess.Reports.PostOfficeRevenueReport
{
    public interface IGetPostOfficeRevenueReportOperation
    {
        List<GetPostOfficeRevenueReportResponse> GetPostOfficeRevenueReport(GetPostOfficeRevenueReportRequest request);
    }
}
