namespace newProjectSUHA.Server.Dtos
{
    public class EnrolledRequestDTO
    {
        public int? UserId { get; set; }

        public int? ClassSubId { get; set; }

        public int? ClassTimeId { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public string? PaymentMethod { get; set; }
    }
}
