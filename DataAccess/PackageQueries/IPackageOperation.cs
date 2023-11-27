using PostOffice.Models;

namespace PostOffice.DataAccess.Packages
{
    public interface IPackageOperation
    {
        Task<Package> GetPackageByTrackingNumber(string packageId);
        string CreatePackage(Package package);
        void UpdatePackage(Package package, int postOfficeId);
        void UpdateTransaction(double? totalPrice, int customerId, int postOfficeId);
        void UpdatePackageStatus(int packageId, int statusId);
        public int GetAddressId(string address);
        public int GetCustomerIdByUserId(int userId);
        public int GetPostOfficeIdByUserId(int userId);
    }
}
