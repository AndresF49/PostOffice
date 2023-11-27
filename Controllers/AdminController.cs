using Microsoft.AspNetCore.Mvc;
using PostOffice.DataAccess.Admin;
using PostOffice.DataAccess.Reports.AnnualRevenueReport;
using PostOffice.DataAccess.Reports.EmployeeProductivityReport;
using PostOffice.DataAccess.Reports.PostOfficeRevenueReport;
using PostOffice.DataAccess.Reports.WorforceOptimizationReport;
using PostOffice.Models;

namespace PostOffice.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IGetAnnualRevenueReportOperation _getAnnualRevenueReportOperation;
        private readonly IGetEmployeeProductivityReportOperation _getEmployeeProductivityReportOperation;
        private readonly IGetWorforceOptimizationReportOperation _getWorforceOptimizationReportOperation;
        private readonly IAdminOperation _adminOperation;

        public AdminController(IGetAnnualRevenueReportOperation getAnnualRevenueReportOperation,
            IGetEmployeeProductivityReportOperation getEmployeeProductivityReportOperation,
            IGetWorforceOptimizationReportOperation getWorforceOptimizationReportOperation,
            IAdminOperation adminOperation)
        {
            _getAnnualRevenueReportOperation = getAnnualRevenueReportOperation;
            _getEmployeeProductivityReportOperation = getEmployeeProductivityReportOperation;
            _getWorforceOptimizationReportOperation = getWorforceOptimizationReportOperation;
            _adminOperation = adminOperation;
        }

        [HttpPost]
        [Route("AnnualReport")]
        public ActionResult AnnualRevenueReport([FromBody] GetAnnualRevenueReportRequest request)
        {
            var response = _getAnnualRevenueReportOperation.GetAnunalRevenueReport(request);

            return new JsonResult(response);
        }

        [HttpPost]
        [Route("EmployeeProductivityReport")]
        public ActionResult EmployeeProductivityReport([FromBody] GetEmployeeProductivityReportRequest request)
        {
            var response = _getEmployeeProductivityReportOperation.GetEmployeeProductivityReport(request);

            return new JsonResult(response);
        }

        [HttpPost]
        [Route("WorforceOptimizationRepor")]
        public ActionResult WorforceOptimizationRepor()
        {
            var response = _getWorforceOptimizationReportOperation.GetWorforceOptimizationReport();

            return new JsonResult(response);
        }

        [HttpPost]
        [Route("UpdateEmployee")]
        public ActionResult UpdateEmployee([FromBody] UpdateEmployeeRequest reqeust)
        {

            _adminOperation.UpdateEmployee(reqeust);

            return Ok();
        }
    }
}
