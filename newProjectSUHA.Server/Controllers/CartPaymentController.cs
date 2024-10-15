using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using newProjectSUHA.Server.Dtos;
using newProjectSUHA.Server.Models;
using newProjectSUHA.Server.Services;

namespace newProjectSUHA.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartPaymentController : ControllerBase
    {
        private readonly MyDbContext _db;
        string _redirectUrl;
        private CartPayPalPaymentService payPalService;

        public CartPaymentController(MyDbContext db, IConfiguration config, CartPayPalPaymentService paypal)
        {

            _db = db;

            _redirectUrl = config["PayPal:RedirectUrl"] + "/api/CartPayment";

            payPalService = paypal;
        }


        [HttpPost("checkoutForSubscription/{userId}")]
        public IActionResult CreatePayment(int userId)
        {

            if (string.IsNullOrEmpty(_redirectUrl))
                throw new Exception("The redirect link for the paypal should be set correctly on the sitting app.");


            var userCart = _db.Carts.FirstOrDefault(a => a.UserId == userId);

            if (userCart == null) return NotFound("no cart was found");


            var cartList = _db.CartItems
                .Where(a => a.CartId == userCart.Id)
                .ToList();

            if (cartList.IsNullOrEmpty()) return BadRequest("empty cart");

            decimal? totalPrice = 0 + 5;

            foreach (var item in cartList)
            {
                var product = _db.Products.Where(a => a.Id == item.ProductId).FirstOrDefault();

                totalPrice += item.Quantity * product.Price;
            }



            var payment = payPalService.CreatePayment(_redirectUrl ?? " ", totalPrice, null, userId);
            var approvalUrl = payment.links.FirstOrDefault(l => l.rel.Equals("approval_url", StringComparison.OrdinalIgnoreCase))?.href;

            return Ok(new { approvalUrl });
        }

        [HttpGet("success")]
        public IActionResult ExecutePayment(string paymentId, string PayerID, string token, int userId, decimal totalPrice)
        {
            var newOrder = new Order
            {
                UserId = userId,
                Date = DateTime.Now,
                Total = totalPrice,
                PaymentMethod = "Paypal",
            };

            _db.Orders.Add(newOrder);
            _db.SaveChanges();

            var userCart = _db.Carts.FirstOrDefault(a => a.UserId == userId);

            var cartList = _db.CartItems
               .Where(a => a.CartId == userCart.Id)
               .ToList();

            foreach (var item in cartList)
            {
                var newItem = new OrderItem
                {
                    OrderId = newOrder.Id,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                };
                _db.OrderItems.Add(newItem);
            }
            _db.SaveChanges();



            _db.CartItems.RemoveRange(cartList);
            _db.SaveChanges();



            var executedPayment = payPalService.ExecutePayment(paymentId, PayerID, userId, totalPrice);
            const string script = "<script>window.close();</script>";
            return Content(script, "text/html");
        }

        [HttpGet("cancel")]
        public IActionResult CancelPayment()
        {
            return BadRequest("Payment canceled.");
        }
    }
}

