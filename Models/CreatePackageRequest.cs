namespace PostOffice.Models
{
    public class CreatePackageRequest
    {
        public int SenderId { get; set; } // userId
        public string Receiver { get; set; }
        public string? DescriptionOfItem { get; set; }
        public double? DeclaedValue { get; set; }
        public int PackageTypeId { get; set; }
        public double? Weight { get; set; }
        public double? Length { get; set; }
        public double? Width { get; set; }
        public double? Depth { get; set; }
        public bool SignatureRequired { get; set; }
        public bool Insurance { get; set; }
        public string SourceAddress { get; set; }
        public string DestinationAddress { get; set; }
    }
}
