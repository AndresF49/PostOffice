namespace PostOffice.Models
{
    public class EmployeeCreatePackageRequest
    {
        public int UserId { get; set; }
        // public Package Package { get; set; }
        // public string TrackingNumber { get; set; }

        public string Receiver { get; set; }

        public int SenderId { get; set; }

        public double? Price { get; set; }

        public string? DescriptionOfItem { get; set; }

        public double? DeclaredValue { get; set; }

        public int PackageTypeId { get; set; }

        public double Weight { get; set; }

        public double? Length { get; set; }

        public double? Width { get; set; }

        public double? Depth { get; set; }

        public bool SignatureRequired { get; set; }

        public bool Insurance { get; set; }

        public string SourceAddress { get; set; }

        public string DestinationAddress { get; set; }

        public int StatusId { get; set; }

        public int PostOfficeId { get; set; }
    }
}
