namespace newProjectSUHA.Server.Dtos
{
    public class BStoCartDTO
    {
        public int ProductId { get; set; }
        public int? Quantity { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public decimal Price { get; set; }
    }
}
