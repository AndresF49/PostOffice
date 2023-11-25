namespace PostOffice.Models
{
    public class UpdatePackageRequest
    {
        public int PostOfficeId { get; set; }
        public Package Package { get; set; }
    }
}
