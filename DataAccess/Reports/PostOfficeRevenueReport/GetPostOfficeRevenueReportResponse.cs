namespace PostOffice.DataAccess.Reports.PostOfficeRevenueReport
{
    public class GetPostOfficeRevenueReportResponse
    {
        public int PostOfficeId { get; set; }
        public int PackageId { get; set; }
        public double TotalPrice { get; set; }
        public double TotalRevenue { get; set; }
    }
}
