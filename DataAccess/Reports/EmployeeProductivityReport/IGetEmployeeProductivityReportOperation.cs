namespace PostOffice.DataAccess.Reports.EmployeeProductivityReport
{
    public interface IGetEmployeeProductivityReportOperation
    {
        Task<List<GetEmployeeProductivityReportResponse>> GetEmployeeProductivityReport(GetEmployeeProductivityReportRequest request);
    }
}
