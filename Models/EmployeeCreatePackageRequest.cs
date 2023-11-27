namespace PostOffice.Models
{
    public class EmployeeCreatePackageRequest
    {
        public int UserId { get; set; }
        public Package Package { get; set; }
    }
}
