namespace PostOffice.DataAccess.Reports.PostOfficeRevenueReport
{
    public class GetPostOfficeRevenueReportRequest
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int PostOfficeId { get; set; }
    }
}
