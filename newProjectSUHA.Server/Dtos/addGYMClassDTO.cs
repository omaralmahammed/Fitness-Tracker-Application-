namespace newProjectSUHA.Server.Dtos
{
    public class addGYMClassDTO
    {
        public string? Name { get; set; }
        public string? Trainer { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public string? Flag { get; set; }
        public IFormFile? Image { get; set; }
    }
}
