namespace PostOffice.DataAccess.Reports.EmployeeProductivityReport
{
    public class GetEmployeeProductivityReportRequest
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int EmployeeId { get; set; }
    }
}
