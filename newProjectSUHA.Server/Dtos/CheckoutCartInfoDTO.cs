namespace newProjectSUHA.Server.Dtos
{
    public class CheckoutCartInfoDTO
    {
        public int? Quantity { get; set; }

        public productIno p { get; set; }
    }


    public class productIno
    {
        public string? Name { get; set; }

        public decimal? Price { get; set; }

    }
}
