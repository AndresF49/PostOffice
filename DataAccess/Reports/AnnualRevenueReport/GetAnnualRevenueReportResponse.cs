namespace PostOffice.DataAccess.Reports.AnnualRevenueReport
{
    public class GetAnnualRevenueReportResponse
    {
        public int PostOfficeId { get; set; }
        // public int PostMasterId { get; set; }
        // public string PostMasterName { get; set;}
        public double TotalRevenue { get; set; }
    }
}
