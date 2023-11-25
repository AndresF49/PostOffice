using PostOffice.Models;

namespace PostOffice.DataAccess.UserQueries
{
    public interface IUserOperation
    {
        Task<User> GetUserIdByCredentials(User credentials);

        Task<User> GetUserByUserId(int userId);
    }
}
