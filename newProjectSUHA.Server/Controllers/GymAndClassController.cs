using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using newProjectSUHA.Server.Models;

namespace newProjectSUHA.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GymAndClassController : ControllerBase
    {


        private readonly MyDbContext _db;

        public GymAndClassController(MyDbContext db)
        {
            _db = db;
        }


        [HttpGet("GetClassOrGym/{type}")]
        public IActionResult GetClassOrGym(string type)
        {

            var categoryItems = _db.ClassAndGyms.Where(f => f.Flag == type).ToList();

            return Ok(categoryItems);
        }


        [HttpGet("GetItemsDetails/{id}")]
        public IActionResult GetItemsDetails(int id)
        {

            var itemDetails = _db.ClassAndGyms.Find(id);

            return Ok(itemDetails);
        }

    }
}
