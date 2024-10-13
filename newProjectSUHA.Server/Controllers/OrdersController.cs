using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using newProjectSUHA.Server.Models;

namespace newProjectSUHA.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly MyDbContext _db;

        //public OrdersController( MyDbContext db)
        //{
        //    _db = db;
        //}

        //[HttpGet("{UserId}")]
        //public IActionResult getOrders(int UserId)
        //{
        //    var orders = _db.Orders.               }

    }
}
