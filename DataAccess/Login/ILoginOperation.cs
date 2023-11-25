using PostOffice.Models;

namespace PostOffice.DataAccess.Login
{
    public interface ILoginOperation
    {
        User LoginAsync(LoginCredentials credentials);
    }
}
