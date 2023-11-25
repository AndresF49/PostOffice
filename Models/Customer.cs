namespace PostOffice.Models
{
    public class Customer
    {
        public int CustomerId { get; set; }
        public string FirstName { get; set; }
        public char? MiddleInitial { get; set; } = null;
        public string LastName { get; set; }
        public string? PhoneNumber { get; set; } = null;
        public string Email { get; set; }
        public int? BillingAddressId { get; set; } = null;
        public int UserId { get; set; }
    }
}