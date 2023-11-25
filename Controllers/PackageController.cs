using Microsoft.AspNetCore.Mvc;
using PostOffice.DataAccess.Packages;
using PostOffice.Models;

namespace PostOffice.Controllers;

[ApiController]
[Route("[controller]")]
public class PackageController : ControllerBase
{
    private readonly IPackageOperation _packageOperation;

    public PackageController(IPackageOperation packageOperation)
    {
        _packageOperation = packageOperation;
    }

    [HttpPost]
    [Route("CreatePackage")]
    public ActionResult<Package> CreatePackage([FromBody] Package package)
    {
        if (_packageOperation.CreatePackage(package) < 1)
        {
            return BadRequest("Invalid package");
        }
        else
        {
            return Ok();
        }
    }

    [HttpPost]
    [Route("SearchPackage")]
    public ActionResult<Package> SearchPackage([FromBody] SearchRequest searchRequest)
    {
            if (string.IsNullOrEmpty(searchRequest.TrackingNumber))
            {
                return BadRequest("Invalid search request.");
            }

            var searchResult = _packageOperation.GetPackageByTrackingNumber(searchRequest.TrackingNumber).Result;

            if (string.IsNullOrEmpty(searchResult.PackageId.ToString()))
            {
                return NotFound("Object not found.");
            }

            return Ok(searchResult);
        }

}

