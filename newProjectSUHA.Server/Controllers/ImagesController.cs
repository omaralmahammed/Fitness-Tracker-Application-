using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace newProjectSUHA.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {

        [HttpGet("getImages/{imageName}")]
        public IActionResult getImage(string imageName)
        {
            var pathImage = Path.Combine(Directory.GetCurrentDirectory(), "Upload", imageName);

            if (System.IO.File.Exists(pathImage))
            {
                return PhysicalFile(pathImage, "image/*");
            }

            return NotFound();

        }

        ///this api is for tips images dooooont touch it plz

        [HttpGet("TipsImages/{imageName}")]
        public IActionResult getTipsImage(string imageName)
        {
            var pathImage = Path.Combine(Directory.GetCurrentDirectory(), "Upload", imageName);

            if (System.IO.File.Exists(pathImage))
            {
                return PhysicalFile(pathImage, "image/*");
            }

            return NotFound();

        }

        ///this api is for recipes images dooooont touch it plz
        [HttpGet("RecipesImages/{imageName}")]
        public IActionResult getRecImage(string imageName)
        {
            var pathImage = Path.Combine(Directory.GetCurrentDirectory(), "Upload", imageName);

            if (System.IO.File.Exists(pathImage))
            {
                return PhysicalFile(pathImage, "image/*");
            }

            return NotFound();

        }
    }
}
