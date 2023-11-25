using Microsoft.AspNetCore.Mvc;
using PostOffice.DataAccess.CustomerQueries;

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

        [HttpPost]
        [Route("CreatePackage")]
        public ActionResult GetCustomers()
        {
            return Ok(_customerOperation.GetCustomers());
        }
    }
}
