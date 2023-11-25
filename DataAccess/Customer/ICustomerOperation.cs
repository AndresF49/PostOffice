using PostOffice.Models;

namespace PostOffice.DataAccess.CustomerQueries
{
    public interface ICustomerOperation
    {
        Task<List<Customer>> GetCustomers();
    }
}
