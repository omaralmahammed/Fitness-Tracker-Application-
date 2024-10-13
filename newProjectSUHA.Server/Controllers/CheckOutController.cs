using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using newProjectSUHA.Server.Dtos;
using newProjectSUHA.Server.Models;

namespace newProjectSUHA.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckOutController : ControllerBase
    {
        private readonly MyDbContext _db;

        public CheckOutController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("getUserInfoForOrder/{userId}")]
        public IActionResult getUserInfoForOrder(int userId)
        {
            if (userId <= 0) return BadRequest("invalid id");

            var user = _db.Users
                .Where(a => a.Id == userId)
                .Select(a => new UserCheckoutInfoDTO
                {
                    FirstName = a.FirstName,
                    LastName = a.LastName,
                    Email = a.Email,
                })
                .FirstOrDefault();

            if (user == null) return NotFound("no user was found");

            return Ok(user);
        }


        [HttpGet("getCartDetailsForCheckout/{userId}")]
        public IActionResult getCartDetailsForCheckout(int userId)
        {
            if (userId <= 0) return BadRequest("invalid id");

            var userCart = _db.Carts.Where(a => a.UserId == userId).FirstOrDefault();

            var cart = _db.CartItems
                .Where(a => a.CartId == userCart.Id)
                .Include(a => a.Product)
                .Select(a => new CheckoutCartInfoDTO
                {
                    Quantity = a.Quantity,
                    p = new productIno
                    {
                        Name = a.Product.Name,
                        Price = a.Product.Price,
                    }

                })
                .ToList();

            if (cart == null) return NotFound("the order is empty");

            return Ok(cart);
        }


        [HttpPut("finishOrder/{userId}")]
        public IActionResult finishOrder(int userId, [FromBody] string method)
        {
            if (userId <= 0) return BadRequest("invalid id");

            var order = _db.Orders.Where(a => a.UserId == userId && a.PaymentMethod == null).FirstOrDefault();

            if (order == null) return NotFound("no order was found");

            order.PaymentMethod = method;

            return Ok();
        }



    }
}
