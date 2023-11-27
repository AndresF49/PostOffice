namespace PostOffice.DataAccess.Reports.EmployeeProductivityReport
{
    public interface IGetEmployeeProductivityReportOperation
    {
        List<GetEmployeeProductivityReportResponse> GetEmployeeProductivityReport(GetEmployeeProductivityReportRequest request);
    }
}
