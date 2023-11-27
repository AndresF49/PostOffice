using PostOffice.Models;

namespace PostOffice.DataAccess.Registration
{
    public interface IRegistrationOperation
    {
        bool CheckUserExistance(User user);
        bool CreateUser(User user);
        bool CreateCustomer(Customer customer);
        int GetCustomerId(Customer customer);
        bool UpdateCustomerIdOnUser(int userId, int customerId);
        int CreateEmployee(CreateEmployeeRequest employee);
        bool UpdateEmployeeIdOnUser(int userId, int employeeId);

    }
}
