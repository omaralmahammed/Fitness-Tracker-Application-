namespace newProjectSUHA.Server.Dtos
{
    public class CartItemsDto
    {
        public int Id { get; set; }

        public int? Quantity { get; set; }

        public cartProduct cp {  get; set; }
    }



    public class cartProduct
    {
        public string? Name { get; set; }

        public decimal? Price { get; set; }

        public string? Image { get; set; }
    }
}
