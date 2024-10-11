using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using newProjectSUHA.Server.Dtos;
using newProjectSUHA.Server.Models;

namespace newProjectSUHA.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly MyDbContext _db;

        public CartController(MyDbContext db)
        {
            _db = db;
        }



        [HttpPost("addCartItems/{userId}")]
        public IActionResult addCartItems(int userId, [FromBody] addCartItemsDTO ci)
        {
            if (userId <= 0) return BadRequest("invalid id");

            var userCart = _db.Carts.Where(a => a.UserId == userId).FirstOrDefault();

            var existingItem = _db.CartItems
                                .FirstOrDefault(x => x.CartId == userCart.Id && x.ProductId == ci.ProductId);

            if (existingItem != null)
            {
                existingItem.Quantity += ci.Quantity ?? 1;

                _db.SaveChanges();

                return Ok();
            }
            else
            {

                var newItem = new CartItem
                {
                    CartId = userCart.Id,
                    ProductId = ci.ProductId,
                    Quantity = ci.Quantity ?? 1,
                };

                _db.CartItems.Add(newItem);
                _db.SaveChanges();

                return Ok();
            }
        }




        [HttpGet("getCartItems/{userId}")]
        public IActionResult getCartItems(int userId)
        {
            if (userId <= 0) return BadRequest("invalid id");

            var userCart = _db.Carts.Where(a => a.UserId == userId).FirstOrDefault();

            if (userCart == null) return NotFound("no cart was found");

            var cartItems = _db.CartItems.Where(a => a.CartId == userCart.Id).ToList();

            if (cartItems.IsNullOrEmpty()) return NotFound("no cart Items was found");

            return Ok(cartItems);

        }


        [HttpGet("getCartTotal/{userId}")]
        public IActionResult getCartTotal(int userId)
        {
            if (userId <= 0) return BadRequest("invalid id");

            var userCart = _db.Carts.Where(a => a.UserId == userId).FirstOrDefault();

            if (userCart == null) return NotFound("no cart was found");

            var cartItems = _db.CartItems.Where(a => a.CartId == userCart.Id).ToList();

            if (cartItems.IsNullOrEmpty()) return NotFound("no cart Items was found");

            decimal? total = 0;

            foreach (var item in cartItems)
            {
                var product = _db.Products.Where(a => a.Id == item.ProductId).FirstOrDefault();

                total += item.Quantity * product.Price;
            };

            return Ok(total);
        }


        [HttpPut("changeCartItemQuantity/{usrId}/{productId}")]
        public IActionResult changeCartItemQuantity(int userId, int productId, [FromBody] int quantity)
        {
            if (productId <= 0 || userId <= 0) return BadRequest("invaid id");
            if (quantity <= 0) return BadRequest("can't accept quantity of 0 or less");

            var userCart = _db.Carts.Where(a => a.UserId == userId).FirstOrDefault();

            if (userCart == null) return NotFound("no cart was found");

            var product = _db.CartItems.Where(a => a.CartId == userCart.Id && a.ProductId == productId).FirstOrDefault();

            if (product == null) return NotFound("no product was found");

            product.Quantity = quantity;
            _db.CartItems.Update(product);
            _db.SaveChanges();
            return Ok("quantity updated");
        }



        [HttpDelete("deleteCartItemQuantity/{usrId}/{productId}")]
        public IActionResult deleteCartItemQuantity(int userId, int productId, [FromBody] int quantity)
        {
            if (productId <= 0 || userId <= 0) return BadRequest("invaid id");
            if (quantity <= 0) return BadRequest("can't accept quantity of 0 or less");

            var userCart = _db.Carts.Where(a => a.UserId == userId).FirstOrDefault();

            if (userCart == null) return NotFound("no cart was found");

            var product = _db.CartItems.Where(a => a.CartId == userCart.Id && a.ProductId == productId).FirstOrDefault();

            if (product == null) return NotFound("no product was found");

            _db.CartItems.Remove(product);
            _db.SaveChanges();
            return NoContent();
        }













    }
}
