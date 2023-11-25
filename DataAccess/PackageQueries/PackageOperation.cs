using System.Data.SqlClient;
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

                var result = await connection.QueryFirstOrDefaultAsync<Package>(sql, parameters);

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
                    Status = result.Status
                };


            }

        }
    }
}
