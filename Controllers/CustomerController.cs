using Microsoft.AspNetCore.Mvc;
using PostOffice.DataAccess.CustomerQueries;
using System.Text.Json;


namespace PostOffice.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerOperation _customerOperation;

        public CustomerController(ICustomerOperation customerOperation)
        {
            _customerOperation = customerOperation;
        }

        [HttpGet]
        [Route("GetCustomers")]
        public ActionResult GetCustomers()
        {
            return Ok(JsonSerializer.Serialize(_customerOperation.GetCustomers()));
        }

        [HttpGet]
        [Route("GetCustomerById")]
        public ActionResult GetCustomerById(int customerId)
        {
            var result = _customerOperation.GetCustomerById(customerId);
            if (result == null) {
                return NotFound("No customer found");
            }
            return Ok(JsonSerializer.Serialize(_customerOperation.GetCustomers()));
        }
    }
}
