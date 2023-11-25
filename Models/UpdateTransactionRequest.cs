namespace PostOffice.Models
{
    public class UpdateTransactionRequest
    {
        public float TotalPrice { get; set; }
        public Customer Customer { get; set; }
        public DateTime TransactionDate { get; set; }
        public Package Package { get; set; }
    }
}
