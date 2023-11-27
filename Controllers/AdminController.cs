using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using PostOffice.DataAccess.Admin;
using PostOffice.DataAccess.Reports.AnnualRevenueReport;
using PostOffice.DataAccess.Reports.EmployeeProductivityReport;
using PostOffice.DataAccess.Reports.WorkforceOptimizationReport;
using PostOffice.Models;

namespace PostOffice.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IGetAnnualRevenueReportOperation _getAnnualRevenueReportOperation;
        private readonly IGetEmployeeProductivityReportOperation _getEmployeeProductivityReportOperation;
        private readonly IGetWorkforceOptimizationReportOperation _getWorkforceOptimizationReportOperation;
        private readonly IAdminOperation _adminOperation;

        public AdminController(IGetAnnualRevenueReportOperation getAnnualRevenueReportOperation,
            IGetEmployeeProductivityReportOperation getEmployeeProductivityReportOperation,
            IGetWorkforceOptimizationReportOperation getWorkforceOptimizationReportOperation,
            IAdminOperation adminOperation)
        {
            _getAnnualRevenueReportOperation = getAnnualRevenueReportOperation;
            _getEmployeeProductivityReportOperation = getEmployeeProductivityReportOperation;
            _getWorkforceOptimizationReportOperation = getWorkforceOptimizationReportOperation;
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

        [HttpGet]
        [Route("WorkforceOptimizationReport")]
        public ActionResult WorkforceOptimizationReport()
        {
            var response = _getWorkforceOptimizationReportOperation.GetWorkforceOptimizationReport();

            return new JsonResult(response);
        }

        [HttpPost]
        [Route("UpdateEmployee")]
        public ActionResult UpdateEmployee([FromBody] UpdateEmployeeRequest reqeust)
        {

            _adminOperation.UpdateEmployee(reqeust);

            return Ok();
        }

        [HttpGet]
        [Route("GetEmployees")]
        public ActionResult GetEmployees()
        {

            return Ok(JsonSerializer.Serialize(_adminOperation.GetEmployees()));

        }
    }
}
