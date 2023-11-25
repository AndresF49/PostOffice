using PostOffice.Models;

namespace PostOffice.DataAccess.Packages
{
    public interface IPackageOperation
    {
        Task<Package> GetPackageByTrackingNumber(string packageId);
        int CreatePackage(Package package);
        void UpdatePackage(Package package, int postOfficeId);
        void UpdateTransaction(float totalPrice, int customerId, int postOfficeId);
        void UpdatePackageStatus(int packageId, int statusId);
    }
}
