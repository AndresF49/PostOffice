namespace PostOffice.DataAccess.Reports.AnnualRevenueReport
{
    public interface IGetAnnualRevenueReportOperation
    {
        List<GetAnnualRevenueReportResponse> GetAnunalRevenueReport(GetAnnualRevenueReportRequest request);
    }
}
