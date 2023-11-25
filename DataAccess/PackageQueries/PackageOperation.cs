using System.Data.SqlClient;
using System.Data;
using Dapper;
using PostOffice.Models;

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
                    Sender = result.Sender,
                    Price = result.Price,
                    DescriptionOfItem = result.DescriptionOfItem,
                    DeclaredValue = result.DeclaredValue,
                    PackageType = result.PackageType,
                    Weight = result.Weight,
                    Length = result.Length,
                    Width = result.Width,
                    Depth = result.Depth,
                    SignatureRequired = result.SignatureRequired,
                    Insurance = result.Insurance,
                    SourceAddress = result.SourceAddress,
                    DestinationAddress = result.DestinationAddress,
                    StatusId = result.StatusId
                };
            }
        }

        public int CreatePackage(Package package)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("PODB")))
            {
                var sql = @"
                INSERT INTO PACKAGES
                (
                    Receiver,
                    Sender,
                    Price,
                    DescriptionOfItem,
                    DeclaredValue,
                    PackageType,
                    Weight,
                    Length,
                    Width,
                    Depth,
                    SignatureRequired,
                    Insurance,
                    SourceAddress,
                    DestinationAddress,
                    StatusId,
                    UpdatedTimestamp
                )
                VALUES
                (
                    @Receiver,
                    @Sender,
                    @Price,
                    @DescriptionOfItem,
                    @DeclaredValue,
                    @PackageType,
                    @Weight,
                    @Length,
                    @Width,
                    @Depth,
                    @SignatureRequired,
                    @Insurance,
                    @SourceAddress,
                    @DestinationAddress,
                    @StatusId,
                    GETDATE()
                )";

                var parameters = new Dictionary<string, object>
                {
                    {"@Receiver", package.Receiver},
                    {"@Sender", package.Sender},
                    {"@Price", package.Price},
                    {"@PackageType", package.PackageType},
                    {"@SignatureRequired", package.SignatureRequired},
                    {"@Insurance", package.Insurance},
                    {"@SourceAddress", package.SourceAddress},
                    {"@DestinationAddress", package.DestinationAddress},
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

                return connection.Execute(sql, parameters, commandType: CommandType.Text);
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
                    Sender = @Sender,
                    Price = @Price,
                    DescriptionOfItem = @DescriptionOfItem,
                    DeclaredValue = @DeclaredValue,
                    PackageType = @PackageType,
                    Weight = @Weight,
                    Length = @Length,
                    Width = @Width,
                    Depth = @Depth,
                    SignatureRequired = @SignatureRequired,
                    Insurance = @Insurance,
                    SourceAddress = @SourceAddress,
                    DestinationAddress = @DestinationAddress,
                    StatusId = @StatusId,
                    PostOfficeId = @PostOfficeId,
                    UpdatedTimestamp = GETDATE()
                WHERE PackageId = @PackageId
                ";

                var parameters = new Dictionary<string, object>
                {
                    {"@Receiver", package.Receiver},
                    {"@Sender", package.Sender},
                    {"@Price", package.Price},
                    {"@DescriptionOfItem", package.DescriptionOfItem},
                    {"@DeclaredValue", package.DeclaredValue},
                    {"@PackageType", package.PackageType},
                    {"@Weight", package.Weight},
                    {"@Length", package.Length},
                    {"@Width", package.Width},
                    {"@Depth", package.Depth},
                    {"@SignatureRequired", package.SignatureRequired},
                    {"@Insurance", package.Insurance},
                    {"@SourceAddress", package.SourceAddress},
                    {"@DestinationAddress", package.DestinationAddress},
                    {"@StatusId", package.StatusId},
                    {"@PostOfficeId", postOfficeId}
                };

                connection.Execute(sql, parameters, commandType: CommandType.Text);

            }
        }

        public void UpdateTransaction(float totalPrice, int customerId, int postOfficeId)
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

