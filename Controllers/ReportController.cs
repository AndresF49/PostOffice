using Microsoft.AspNetCore.Mvc;
using PostOffice.DataAccess.Reports.AnnualRevenueReport;
using PostOffice.DataAccess.Reports.EmployeeProductivityReport;
using PostOffice.DataAccess.Reports.PostOfficeRevenueReport;

namespace PostOffice.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReportController : ControllerBase
    {
        private readonly IGetAnnualRevenueReportOperation _getAnnualRevenueReportOperation;
        private readonly IGetEmployeeProductivityReportOperation _getEmployeeProductivityReportOperation;
        private readonly IGetPostOfficeRevenueReportOperation _getPostOfficeRevenueReportOperation;

        public ReportController(IGetAnnualRevenueReportOperation getAnnualRevenueReportOperation,
            IGetEmployeeProductivityReportOperation getEmployeeProductivityReportOperation,
            IGetPostOfficeRevenueReportOperation getPostOfficeRevenueReportOperation)
        {
            _getAnnualRevenueReportOperation = getAnnualRevenueReportOperation;
            _getEmployeeProductivityReportOperation = getEmployeeProductivityReportOperation;
            _getPostOfficeRevenueReportOperation = getPostOfficeRevenueReportOperation;
        }

        [HttpPost]
        [Route("AnnualReport")]
        public ActionResult AnnualRevenueReport([FromBody] GetAnnualRevenueReportRequest request)
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

        [HttpPost]
        [Route("PostOfficeRevenueReport")]
        public ActionResult PostOfficeRevenueReport([FromBody] GetPostOfficeRevenueReportRequest request)
        {
            var response = _getPostOfficeRevenueReportOperation.GetPostOfficeRevenueReport(request);

            return new JsonResult(response.Result);
        }
    }
}
