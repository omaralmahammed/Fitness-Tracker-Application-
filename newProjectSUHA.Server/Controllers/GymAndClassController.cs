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


    }
}
