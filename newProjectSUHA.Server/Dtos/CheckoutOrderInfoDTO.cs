namespace newProjectSUHA.Server.Dtos
{
    public class CheckoutOrderInfoDTO
    {
        public decimal? Total { get; set; }

        public List<orderItemsInfo> oi { get; set; }
    }


    public class orderItemsInfo
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
