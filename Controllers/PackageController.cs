using Microsoft.AspNetCore.Mvc;

namespace PostOffice.Controllers;

[ApiController]
[Route("[controller]")]
public class PackageController : ControllerBase
{

	private static IEnumerable<Package> Packages = new[] {
		new Package { PackageId=1, Status="Pending", Sender="Andres", 
						TrackingNumber="12345",
						SourceAddress="123 Sesame Street Houston, Tx", Receiver="Stephen", 
						DestinationAddress="456 Hillsboro Blvd Corpus Christi, Tx", Price=25.34,
						DescriptionOfItem="Electronics", DeclaredValue=125.00, PackageType="Package",
						Weight=15, Length=15, Width=15, Depth=15, SignatureRequired=true,
						Insurance=true
					},
		new Package { PackageId=2, Status="Shipped", Sender="Stephen", 
						TrackingNumber="55555",
						SourceAddress="789 Cullen Blvd Houston, Tx", Receiver="Andres", 
						DestinationAddress="1212 Generic Crt Bellaire, Tx", Price=10.88,
						DescriptionOfItem=null, DeclaredValue=null, PackageType="Envelope",
						Weight=null, Length=null, Width=null, Depth=null, SignatureRequired=false,
						Insurance=false
					},
		new Package { PackageId=3, Status="Delivered", Sender="Elmo",
						TrackingNumber="ABC123", 
						SourceAddress="112 Sesame St Houston, Tx", Receiver="Oscar", 
						DestinationAddress="357 Forrest Dr Spring, Tx", Price=28.45,
						DescriptionOfItem="Nunya", DeclaredValue=250, PackageType="Package",
						Weight=25.76, Length=20.00, Width=40.00, Depth=15.00, SignatureRequired=false,
						Insurance=true
					},

	};

    private readonly ILogger<PackageController> _logger;

    public PackageController(ILogger<PackageController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<Package> Get()
    {

		return Packages;
		
    }

	[HttpPost]
	[Route("SearchPackage")]
        public ActionResult<Package> SearchPackage(string searchRequest)
        {
            if (string.IsNullOrEmpty(searchRequest))
            {
                return BadRequest("Invalid search request.");
            }

			var searchResult = Packages.Where(x => x.TrackingNumber == searchRequest);

			if (searchResult == null)
            {
                return NotFound("Object not found.");
            }

            return Ok(searchResult);
        }

}

