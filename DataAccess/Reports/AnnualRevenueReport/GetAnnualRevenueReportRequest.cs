namespace PostOffice.DataAccess.Reports.AnnualRevenueReport
{
    public class GetAnnualRevenueReportRequest
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int PostOfficeId { get; set; }
    }
}
