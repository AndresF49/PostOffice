namespace PostOffice.DataAccess.Reports.EmployeeProductivityReport
{
    public class GetEmployeeProductivityReportResponse
    {
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public DateTime StartDate { get; set; }
        public int MonthsWorked { get; set; }
        public double TotalRevenue { get; set; }
    }
}
