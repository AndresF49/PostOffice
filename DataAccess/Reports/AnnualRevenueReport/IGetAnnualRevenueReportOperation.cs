namespace PostOffice.DataAccess.Reports.AnnualRevenueReport
{
    public interface IGetAnnualRevenueReportOperation
    {
        Task<List<GetAnnualRevenueReportResponse>> GetAnunalRevenueReport(GetAnnualRevenueReportRequest request);
    }
}
