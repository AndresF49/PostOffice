using PostOffice.Models;

namespace PostOffice.DataAccess.Admin
{
    public interface IAdminOperation
    {
        void UpdateEmployee(UpdateEmployeeRequest employee);
    }
}
