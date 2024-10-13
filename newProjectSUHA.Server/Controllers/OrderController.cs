using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using newProjectSUHA.Server.Models;
using PayPal.Api;

namespace newProjectSUHA.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly MyDbContext _db;
        public OrderController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("{UserId}")]
        public IActionResult GetAllOrdersByUserId(int UserId)
        {

            var orders = _db.Orders
                            .Where(order => order.UserId == UserId)
                            .ToList();

            if (orders == null)
            {
                return NotFound("No orders found for this user.");
            }

            return Ok(orders);
        }

        [HttpGet("getOrderItem/{orderId}")]
        public IActionResult GetOrderDetails(int orderId)
        {
            var orderDetails = _db.OrderItems.Include(p => p.Product).Where(oi => oi.OrderId == orderId).ToList();

            if (orderDetails == null || orderDetails.Count == 0)
            {
                return NotFound("Order not found or no items in the order.");
            }

            return Ok(orderDetails);

        }
    }
}
