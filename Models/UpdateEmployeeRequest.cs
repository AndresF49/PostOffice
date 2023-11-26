namespace PostOffice.Models
{
    public class UpdateEmployeeRequest
    {
        public int EmployeeId { get; set; }
        public string? Ssn { get; set; }
        public string? FirstName { get; set; }
        public string? MiddleInitial { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public int RoleTypeId { get; set; }
        public double Salary { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime StartDate { get; set; }
        public int UserId { get; set; }
        public int PostOfficeId { get; set; }
        public int PostMasterId { get; set; }

    }
}
