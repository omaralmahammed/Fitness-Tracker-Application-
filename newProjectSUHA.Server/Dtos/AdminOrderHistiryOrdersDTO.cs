namespace newProjectSUHA.Server.Dtos
{
    public class AdminOrderHistiryOrdersDTO
    {
        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public int? UserId { get; set; }

        public decimal? Total { get; set; }

        public string? PaymentMethod { get; set; }

        public DateTime? Date { get; set; }
    }
}
