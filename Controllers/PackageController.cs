using Microsoft.AspNetCore.Mvc;
using PostOffice.DataAccess.Packages;
using PostOffice.Models;
using System.Text.Json;

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
    public ActionResult CreatePackage([FromBody] CreatePackageRequest request)
    {

        double? price = 0.0;

        if (request.PackageTypeId == 1)
        {
            price = (request.Weight * 0.4 + request.Length * 0.2 + request.Width * 0.2 + request.Depth * 0.2) * 4;
        }
        else
        {
            price = request.Weight * 4;
        }

        var package = new Package()
        {
            TrackingNumber = Guid.NewGuid().ToString(),
            Receiver = request.Receiver,
            SenderId = _packageOperation.GetCustomerIdByUserId(request.SenderId),
            DescriptionOfItem = request.DescriptionOfItem,
            PackageTypeId = request.PackageTypeId,
            Weight = request.Weight,
            Length = request.Length,
            Width = request.Width,
            Depth = request.Depth,
            SignatureRequired = request.SignatureRequired,
            Insurance = request.Insurance,
            SourceAddressId = _packageOperation.GetAddressId(request.SourceAddress),
            DestinationAddressId = _packageOperation.GetAddressId(request.DestinationAddress),
            StatusId = 1
        };

        package.Price = price;

        var response = _packageOperation.CreatePackage(package);
        if (response == "failed")
        {
            return BadRequest("Invalid package");
        }
        else
        {
            return Ok(JsonSerializer.Serialize(response));
        }
    }

    [HttpPost]
    [Route("EmployeeCreatePackage")]
    public ActionResult EmployeeCreatePackge([FromBody] EmployeeCreatePackageRequest request)
    {

        double? price = 0.0;

        if (request.Package.PackageTypeId == 1)
        {
            price = (request.Package.Weight * 0.4 + request.Package.Length * 0.2 + request.Package.Width * 0.2 + request.Package.Depth * 0.2) * 4;
        }
        else
        {
            price = request.Package.Weight * 4;
        }

        var package = new Package()
        {
            TrackingNumber = Guid.NewGuid().ToString(),
            Receiver = request.Package.Receiver,
            SenderId = request.Package.SenderId,
            DescriptionOfItem = request.Package.DescriptionOfItem,
            PackageTypeId = request.Package.PackageTypeId,
            Weight = request.Package.Weight,
            Length = request.Package.Length,
            Width = request.Package.Width,
            Depth = request.Package.Depth,
            SignatureRequired = request.Package.SignatureRequired,
            Insurance = request.Package.Insurance,
            SourceAddressId = request.Package.SourceAddressId,
            DestinationAddressId = request.Package.DestinationAddressId,
            StatusId = request.Package.StatusId,
        };

        package.Price = price;

        var response = _packageOperation.CreatePackage(package);
        if (response == "failed")
        {
            return BadRequest("Invalid package");
        }
        else
        {
            var postOfficeId = _packageOperation.GetPostOfficeIdByUserId(request.UserId);
            _packageOperation.UpdateTransaction(package.Price, package.SenderId, postOfficeId);
            return Ok(JsonSerializer.Serialize(response));

        }
    }

    [HttpPost]
    [Route("UpdatePackage")]
    public  ActionResult UpdatePackage([FromBody] UpdatePackageRequest request)
    {
        _packageOperation.UpdatePackage(request.Package, request.PostOfficeId);
        return Ok();
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

            return Ok(JsonSerializer.Serialize(searchResult));
        }

    [HttpPost]
    [Route("UpdateTransaction")]
    public ActionResult CreateTransaction([FromBody] UpdateTransactionRequest request)
    {
        // need to fix this Package.PostOfficeId wont work, need to pull from Employee
        _packageOperation.UpdateTransaction(request.TotalPrice, request.Customer.CustomerId, request.Package.PostOfficeId);
        _packageOperation.UpdatePackageStatus(request.Package.PackageId, 2); // StatusId = 2 => InTransit

        return Ok();
    }
}
