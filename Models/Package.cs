/*
PackageId INT IDENTITY(1,1) PRIMARY KEY,
TrackingNumber VARCHAR(MAX) NOT NULL,
Receiver INT NOT NULL,
	FOREIGN KEY (Receiver) REFERENCES Customers(CustomerId),
Sender INT NOT NULL,
	FOREIGN KEY (Sender) REFERENCES Customers(CustomerId),
Price DECIMAL NOT NULL,
DescriptionOfItem VARCHAR(120),
DeclaredValue DECIMAL,
PackageTypeId INT NOT NULL,
	FOREIGN KEY (PackageTypeId) REFERENCES PackageTypes(PackageTypeId),
Weight DECIMAL,
Length DECIMAL,
Width DECIMAL,
Depth DECIMAL, 
SignatureRequired BIT NOT NULL,
Insurance BIT NOT NULL,
SourceAddress INT NOT NULL,
	FOREIGN KEY (SourceAddress) REFERENCES Addresses(AddressId),
DestinationAddress INT NOT NULL,
	FOREIGN KEY (DestinationAddress) REFERENCES Addresses(AddressId),
StatusId INT NOT NULL,
*/
using System.Diagnostics.CodeAnalysis;

namespace PostOffice;

public class Package
{
    public int PackageId { get; set; }
	[DisallowNull]
	public string TrackingNumber { get; set;} // NOT NULL
	[DisallowNull]

    public string Receiver { get; set;} // FK -> Int Customers(CustomerId) NOT NULL
	[DisallowNull]
    public string Sender { get; set;} // FK -> Int Customers(CustomerId) NOT NULL
	[DisallowNull]
    public double Price { get; set;} // NOT NULL
    public string? DescriptionOfItem { get; set;}
    public double? DeclaredValue { get; set;}
	[DisallowNull]
    public string PackageType { get; set;} // FK (PackageTypeId) -> Int PackageTypes(PackageTypeId) NOT NULL
    public double? Weight { get; set;}
    public double? Length { get; set;}
    public double? Width { get; set; }
    public double? Depth { get; set; }
	[DisallowNull]
    public bool SignatureRequired { get; set; } // NOT NULL
	[DisallowNull]
	public bool Insurance { get; set; } // NOT NULL
	[DisallowNull]
    public string SourceAddress { get; set; } // FK (SourceAddress) -> Int Addresses(AddressId) NOT NULL
	[DisallowNull]
    public string DestinationAddress { get; set; } // FK (SourceAddress) -> Int Addresses(AddressId) NOT NULL
	[DisallowNull]
    public string Status { get; set; } // FK (StatusId) -> Int PackageStatus(PackageStatusId) NOT NULL

}