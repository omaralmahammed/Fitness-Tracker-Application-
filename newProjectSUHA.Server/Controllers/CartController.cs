using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

            var cartItems = _db.CartItems
                .Where(a => a.CartId == userCart.Id)
                .Include(a => a.Product)
                .Select(a => new CartItemsDto
                {
                    Id = a.Id,
                    Quantity = a.Quantity ?? 1,
                    cp = new cartProduct
                    {
                        Name = a.Product.Name,
                        Image = a.Product.Image,
                        Price = a.Product.Price,
                    }
                })
                .ToList();

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


        [HttpPut("changeCartItemQuantity/{cartItemId}")]
        public IActionResult changeCartItemQuantity(int cartItemId, [FromBody] int quantity)
        {

            if (cartItemId <= 0) return BadRequest("invaid id");
            if (quantity <= 0) return BadRequest("can't accept quantity of 0 or less");

            var product = _db.CartItems.Where(a => a.Id == cartItemId).FirstOrDefault();

            if (product == null) return NotFound("no product was found");

            product.Quantity = quantity;
            _db.CartItems.Update(product);
            _db.SaveChanges();
            return Ok(quantity);
        }



        [HttpDelete("deleteCartItem/{cartItemId}")]
        public IActionResult deleteCartItem(int cartItemId)
        {
            if (cartItemId <= 0) return BadRequest("invaid id");

            var product = _db.CartItems.Where(a => a.Id == cartItemId).FirstOrDefault();

            if (product == null) return NotFound("no product was found");

            _db.CartItems.Remove(product);
            _db.SaveChanges();
            return NoContent();
        }


        [HttpPost("moveFromCartToOrder/{userId}")]
        public IActionResult moveFromCartToOrder(int userId)
        {
            if (userId <= 0) return BadRequest("invalid id");

            var userCart = _db.Carts.FirstOrDefault(a => a.UserId == userId);

            if (userCart == null) return NotFound("no cart was found");


            var cartList = _db.CartItems
                .Where(a => a.CartId == userCart.Id)
                .ToList();

            if (cartList.IsNullOrEmpty()) return BadRequest("empty cart");

            decimal? finalTotal = 0;

            foreach (var item in cartList)
            {
                var product = _db.Products.Where(a => a.Id == item.ProductId).FirstOrDefault();

                finalTotal += item.Quantity * product.Price;
            }


                var newOrder = new Order
                {
                    UserId = userId,
                    Date = DateTime.Now,
                    Total = finalTotal,
                    PaymentMethod = "Paypal",
                };

                _db.Orders.Add(newOrder);
                _db.SaveChanges();


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

            return Ok("cart was moved successfully to order");
        }




        /// <summary>
        /// /////////////////////////////////////////////////////// behavior subject
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>

        [HttpGet("getProductInfoForCart/{productId}")]
        public IActionResult getProductInfoForCart(int productId)
        {
            if (productId <= 0) return BadRequest("invalid id");

            var product = _db.Products
                .Where(a => a.Id == productId)
                .Select(a => new CartProductsInfoDTO
                {
                    Name = a.Name,
                    Price = a.Price,
                    Image = a.Image,
                })
                .FirstOrDefault();

            if (product == null) return NotFound("the product was not found");

            return Ok(product);
        }






        ///////////////////////////////////////////////////////////////// moving from Behavior subject to databse
        ///

        [HttpPost("moveFromBStoDB/{userId}")]
        public IActionResult moveFromBStoDB(int userId, [FromBody] List<BStoCartDTO> l)
        {
            if (userId <= 0) return BadRequest("invalid id");
            if (l.IsNullOrEmpty()) return BadRequest("empty cart in BS");

            var userCart = _db.Carts.FirstOrDefault(a => a.UserId == userId);

            if (userCart == null) return NotFound("no cart was found");

            foreach (var item in l)
            {

                var existingItem = _db.CartItems
                    .FirstOrDefault(x => x.CartId == userCart.Id && x.ProductId == item.ProductId);

                if (existingItem != null)
                {
                    existingItem.Quantity += item.Quantity ?? 1;

                }
                else
                {

                    var newItem = new CartItem
                    {
                        CartId = userCart.Id,
                        ProductId = item.ProductId,
                        Quantity = item.Quantity,

                    };
                    _db.CartItems.Add(newItem);
                }

                _db.SaveChanges();
            }

            return Ok();
        }










    }
}
