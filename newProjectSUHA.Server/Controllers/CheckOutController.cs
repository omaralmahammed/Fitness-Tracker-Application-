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


        [HttpGet("getOrderDetails/{userId}")]
        public IActionResult getOrderDetails (int userId)
        {
            if (userId <= 0) return BadRequest("invalid id");

            var oreder = _db.Orders
                .Where(a => a.UserId == userId && a.PaymentMethod == null)
                .Include(a => a.OrderItems)
                .ThenInclude(x => x.Product)
                .Select(a => new CheckoutOrderInfoDTO
                {
                    Total = a.Total,
                    oi = a.OrderItems.Select(i => new orderItemsInfo
                    {
                        Quantity = i.Quantity,
                        p = new productIno
                        {
                            Name = i.Product.Name,
                            Price = i.Product.Price,
                        }
                    }).ToList(),

                })
                .ToList();

            if (oreder == null) return NotFound("the order is empty");

            return Ok(oreder);
        }


        [HttpPut("finishOrder/{userId}")]
        public IActionResult finishOrder (int userId, [FromBody] string method)
        {
            if (userId <= 0) return BadRequest("invalid id");

            var order = _db.Orders.Where(a => a.UserId == userId && a.PaymentMethod == null).FirstOrDefault();

            if (order == null) return NotFound("no order was found");

            order.PaymentMethod = method;

            return Ok();
        }



    }
}
