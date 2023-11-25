using PostOffice.Models;

namespace PostOffice.DataAccess.Packages
{
    public interface IPackageOperation
    {
        Task<Package> GetPackageByTrackingNumber(string packageId);
        int CreatePackage(Package package);
    }
}
