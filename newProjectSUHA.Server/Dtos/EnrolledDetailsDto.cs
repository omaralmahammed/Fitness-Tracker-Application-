namespace newProjectSUHA.Server.Dtos
{
    public class EnrolledDetailsDto
    {
        public string? Image { get; set; }
        public string? Name { get; set; }
        public string? Trainer { get; set; }
        public string? Duration { get; set; }
        public decimal? FinalPrice { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? PaymentMethod { get; set; }
        public DateTime? ClassStartTime { get; set; }
        public DateTime? ClassEndTime { get; set; }
    }

}
