using PostOffice.Models;

namespace PostOffice.DataAccess.Login
{
    public interface ILoginOperation
    {
        Task<bool> LoginAsync(LoginCredentials user);
    }
}
