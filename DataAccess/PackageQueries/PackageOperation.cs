using System.Data.SqlClient;
using System.Data;
using Dapper;
using PostOffice.Models;
using System.Net;

namespace PostOffice.DataAccess.Packages
{
    public class PackageOperation : IPackageOperation
    {
        private readonly IConfiguration _configuration;
        public PackageOperation(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<Package> GetPackageByTrackingNumber(string trackingNumber)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {
                var sql = @"
                SELECT * FROM Packages
                WHERE TrackingNumber = @TrackingNumber
                ";

                var parameters = new Dictionary<string, object>
                {
                    {"@TrackingNumber", trackingNumber}
                };

                var result = await connection.QueryFirstOrDefaultAsync<Package>(sql, parameters, commandType: CommandType.Text);

                return new Package
                {
                    PackageId = result.PackageId,
                    TrackingNumber = result.TrackingNumber,
                    Receiver = result.Receiver,
                    SenderId = result.SenderId,
                    Price = result.Price,
                    DescriptionOfItem = result.DescriptionOfItem,
                    DeclaredValue = result.DeclaredValue,
                    PackageTypeId = result.PackageTypeId,
                    Weight = result.Weight,
                    Length = result.Length,
                    Width = result.Width,
                    Depth = result.Depth,
                    SignatureRequired = result.SignatureRequired,
                    Insurance = result.Insurance,
                    SourceAddressId = result.SourceAddressId,
                    DestinationAddressId = result.DestinationAddressId,
                    StatusId = result.StatusId
                };
            }
        }

        public int GetPostOfficeIdByUserId(int userId)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {
                var sql = @"SELECT PostOfficeId FROM Employees WHERE UserId = @UserId";

                var parameters = new Dictionary<string, object>
                {
                    {"@UserId", userId}
                };

                return connection.QuerySingleOrDefault(sql, parameters, commandType: CommandType.Text).PostOfficeId;
            }

        }

        public int GetCustomerIdByUserId(int userId)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {
                var sql = @"SELECT CustomerId FROM Customers WHERE UserId = @UserId";

                var parameters = new Dictionary<string, object>
                {
                    {"@UserId", userId}
                };

                return connection.QuerySingleOrDefault(sql, parameters, commandType: CommandType.Text).CustomerId;
            }
        }

        public int GetAddressId(string address)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {
                var sql = @"INSERT INTO Addresses (Address) VALUES (@Address)";

                var parameters = new Dictionary<string, object>
                {
                    {"@Address", address}
                };

                connection.Execute(sql, parameters, commandType: CommandType.Text);

                sql = @"SELECT AddressId FROM Addresses WHERE Address = @Address";

                return connection.QuerySingleOrDefault(sql, parameters, commandType: CommandType.Text).AddressId;
            }
        }

        public string GetAddressById(int addressId)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {
                var sql = @"SELECT Address FROM Addresses WHERE AddressId = @AddressId";

                var parameters = new Dictionary<string, object>
                {
                    {"@AddressId", addressId}
                };

                connection.Execute(sql, parameters, commandType: CommandType.Text);

                return connection.QuerySingleOrDefault(sql, parameters, commandType: CommandType.Text).Address;
            }
        }

        public string CreatePackage(Package package)
        {

            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {
                var sql = @"
                INSERT INTO PACKAGES
                (
                    TrackingNumber
                    Receiver,
                    SenderId,
                    Price,
                    DescriptionOfItem,
                    DeclaredValue,
                    PackageTypeId,
                    Weight,
                    Length,
                    Width,
                    Depth,
                    SignatureRequired,
                    Insurance,
                    SourceAddressId,
                    DestinationAddressId,
                    StatusId,
                    UpdatedTimestamp
                )
                VALUES
                (
                    @TrackingNumber,
                    @Receiver,
                    @SenderId,
                    @Price,
                    @DescriptionOfItem,
                    @DeclaredValue,
                    @PackageTypeId,
                    @Weight,
                    @Length,
                    @Width,
                    @Depth,
                    @SignatureRequired,
                    @Insurance,
                    @SourceAddressId,
                    @DestinationAddressId,
                    1,
                    GETDATE()
                )";

                var parameters = new Dictionary<string, object>
                {
                    {"@TrackingNumber", package.TrackingNumber },
                    {"@Receiver", package.Receiver},
                    {"@SenderId", package.SenderId},
                    {"@Price", package.Price},
                    {"@PackageTypeId", package.PackageTypeId},
                    {"@SignatureRequired", package.SignatureRequired},
                    {"@Insurance", package.Insurance},
                    {"@SourceAddressId", package.SourceAddressId},
                    {"@DestinationAddressId", package.DestinationAddressId},
                    {"@StatusId", package.StatusId}
                };

                var descriptionOfItem = package.DescriptionOfItem != null ? package.DescriptionOfItem : null;
                var declaredValue = package.DeclaredValue != null ? package.DeclaredValue : null;
                var weight = package.Weight != null ? package.Weight : null;
                var length = package.Length != null ? package.Length : null;
                var width = package.Width != null ? package.Width : null;
                var depth = package.Depth != null ? package.Depth : null;

                parameters.Add("@DescriptionOfItem", descriptionOfItem);
                parameters.Add("@DeclaredValue", declaredValue);
                parameters.Add("@Weight", weight);
                parameters.Add("@Length", length);
                parameters.Add("@Width", width);
                parameters.Add("@Depth", depth);

                var result = connection.Execute(sql, parameters, commandType: CommandType.Text);

                if (result < 0)
                {
                    return "failed";
                }

                return package.TrackingNumber.ToString();
            }
        }

        public void UpdatePackage(Package package, int postOfficeId)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {
                var sql = @"
                UPDATE Packages
                SET
                    Receiver = @Receiver,
                    SenderId = @SenderId,
                    Price = @Price,
                    DescriptionOfItem = @DescriptionOfItem,
                    DeclaredValue = @DeclaredValue,
                    PackageTypeId = @PackageTypeId,
                    Weight = @Weight,
                    Length = @Length,
                    Width = @Width,
                    Depth = @Depth,
                    SignatureRequired = @SignatureRequired,
                    Insurance = @Insurance,
                    SourceAddressId = @SourceAddressId,
                    DestinationAddressId = @DestinationAddressId,
                    StatusId = @StatusId,
                    PostOfficeId = @PostOfficeId,
                    UpdatedTimestamp = GETDATE()
                WHERE PackageId = @PackageId
                ";

                var parameters = new Dictionary<string, object>
                {
                    {"@Receiver", package.Receiver},
                    {"@SenderId", package.SenderId},
                    {"@Price", package.Price},
                    {"@DescriptionOfItem", package.DescriptionOfItem},
                    {"@DeclaredValue", package.DeclaredValue},
                    {"@PackageTypeId" , package.PackageTypeId},
                    {"@Weight", package.Weight},
                    {"@Length", package.Length},
                    {"@Width", package.Width},
                    {"@Depth", package.Depth},
                    {"@SignatureRequired", package.SignatureRequired},
                    {"@Insurance", package.Insurance},
                    {"@SourceAddressId", package.SourceAddressId},
                    {"@DestinationAddressId", package.DestinationAddressId},
                    {"@StatusId", package.StatusId},
                    {"@PostOfficeId", postOfficeId}
                };

                connection.Execute(sql, parameters, commandType: CommandType.Text);

            }
        }

        public void UpdateTransaction(double? totalPrice, int customerId, int postOfficeId)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {
                var sql = @"
                INSERT INTO Transactions
                (
                    TotalPrice,
                    PaidByCustomerId,
                    TransactionDate,
                    PostOfficeId
                )
                VALUES
                (
                    @TotalPrice,
                    @PaidByCustomerId,
                    GETDATE(),
                    @PostOfficeId
                )
                ";

                var parameters = new Dictionary<string, object>
                {
                    {"@TotalPrice", totalPrice},
                    {"@PaidByCustomerId", customerId},
                    {"@PostOfficeId", postOfficeId}
                };

                connection.Execute(sql, parameters, commandType: CommandType.Text);
            }
        }

        public void UpdateVisitedLocations(UpdatePackageRequest request)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {

                var addressSql = @"SELECT AddressId FROM PostOffices WHERE PostOfficeId = @PostOfficeId";
                var addressParams = new Dictionary<string, object>
                {
                    {"@PostOfficeId", request.PostOfficeId }
                };

                var addressId = connection.QuerySingleOrDefault(addressSql, addressParams, commandType: CommandType.Text);

                var sql = @"
                INSERT INTO VisitedLocations
                (
                    AddressId,
                    PackageId,
                    EmployeeId,
                    ArrivalTime
                )
                VALUES
                (
                    @AddressId,
                    @PackageId,
                    @EmployeeId,
                    GETDATE()
                )";

                var parameters = new Dictionary<string, object>
                {
                    {"@AddressId", addressId},
                    {"@PackageId", request.Package.PackageId}, // once we update the reqeust we can fix this to be request.Package.PackageId
                    {"@EmployeeId", request.Package.Width} // once we update the request we can fix this to be reqeust.EmployeeId
                };

                connection.Execute(sql, parameters, commandType: CommandType.Text);

            }
        }
        public void UpdatePackageStatus(int packageId, int statusId)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {
                var sql = @"
                UPDATE Packages
                SET
                    StatusId = @StatusId,
                    UpdatedTimestamp = GETDATE()
                WHERE PackageId = @PackageId
                )
                ";

                var parameters = new Dictionary<string, object>
                {
                    {"@StatusId", statusId},
                    {"@PackageId", packageId}
                };

                connection.Execute(sql, parameters, commandType: CommandType.Text);

            }
        }
    }
}

