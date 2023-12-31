using Microsoft.AspNetCore.Mvc;
using PostOffice.DataAccess.CustomerQueries;
using PostOffice.DataAccess.Packages;
using PostOffice.Models;
using System.Text.Json;

namespace PostOffice.Controllers;

[ApiController]
[Route("[controller]")]
public class PackageController : ControllerBase
{
    private readonly IPackageOperation _packageOperation;
    private readonly ICustomerOperation _customerOperation;

    public PackageController(IPackageOperation packageOperation, ICustomerOperation customerOperation)
    {
        _packageOperation = packageOperation;
        _customerOperation = customerOperation;
    }

    [HttpPost]
    [Route("CreatePackage")]
    public ActionResult CreatePackage([FromBody] CreatePackageRequest request)
    {

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


        var package = new Package()
        {
            TrackingNumber = Guid.NewGuid().ToString(),
            Receiver = request.Receiver,
            SenderId = request.SenderId,
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
            StatusId = request.StatusId,
        };

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
    public ActionResult<PackageResponse> SearchPackage([FromBody] SearchRequest searchRequest)
    {
        if (string.IsNullOrEmpty(searchRequest.TrackingNumber))
        {
            return BadRequest("Invalid search request.");
        }

        var searchResult = _packageOperation.GetPackageByTrackingNumber(searchRequest.TrackingNumber).Result;

        if (searchResult == null)
        {
            return NotFound("Package not found");
        }

        var senderCustomer = _customerOperation.GetCustomerById(searchResult.SenderId).Result;

        var response = new PackageResponse
        {
            PackageId = searchResult.PackageId,
            TrackingNumber = searchResult.TrackingNumber,
            Receiver = searchResult.Receiver,
            Sender = senderCustomer.FirstName + " " + senderCustomer.MiddleInitial + " " + senderCustomer.LastName,
            Price = searchResult.Price,
            DescriptionOfItem = searchResult.DescriptionOfItem,
            DeclaredValue = searchResult.DeclaredValue,
            PackageTypeId = searchResult.PackageTypeId,
            Weight = searchResult.Weight,
            Length = searchResult.Length,
            Width = searchResult.Width,
            Depth = searchResult.Depth,
            SignatureRequired = searchResult.SignatureRequired,
            Insurance = searchResult.Insurance,
            SourceAddress = _packageOperation.GetAddressById(searchResult.SourceAddressId),
            DestinationAddress = _packageOperation.GetAddressById(searchResult.DestinationAddressId),
            StatusId = searchResult.StatusId,
            PostOfficeId = searchResult.PostOfficeId
        };

            if (string.IsNullOrEmpty(searchResult.PackageId.ToString()))
            {
                return NotFound("Object not found.");
            }

            return Ok(JsonSerializer.Serialize(response));
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
