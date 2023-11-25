using Microsoft.AspNetCore.Mvc;
using PostOffice.DataAccess.Reports.AnnualRevenueReport;
using PostOffice.DataAccess.Reports.EmployeeProductivityReport;

namespace PostOffice.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReportController : ControllerBase
    {
        private readonly IGetAnnualRevenueReportOperation _getAnnualRevenueReportOperation;
        private readonly IGetEmployeeProductivityReportOperation _getEmployeeProductivityReportOperation;
        public ReportController(IGetAnnualRevenueReportOperation getAnnualRevenueReportOperation,
            IGetEmployeeProductivityReportOperation getEmployeeProductivityReportOperation)
        {
            _getAnnualRevenueReportOperation = getAnnualRevenueReportOperation;
            _getEmployeeProductivityReportOperation = getEmployeeProductivityReportOperation;
        }

        [HttpPost]
        [Route("AnnualReport")]
        public ActionResult AnnualReport([FromBody] GetAnnualRevenueReportRequest request)
        {
            var response = _getAnnualRevenueReportOperation.GetAnunalRevenueReport(request);

            return new JsonResult(response.Result);
        }

        [HttpPost]
        [Route("EmployeeProductivityReport")]
        public ActionResult EmployeeProductivityReport([FromBody] GetEmployeeProductivityReportRequest request)
        {
            var response = _getEmployeeProductivityReportOperation.GetEmployeeProductivityReport(request);

            return new JsonResult(response.Result);
        }
    }
}
