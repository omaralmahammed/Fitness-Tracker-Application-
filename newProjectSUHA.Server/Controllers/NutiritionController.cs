using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using newProjectSUHA.Server.Dtos;
using Microsoft.EntityFrameworkCore;
using newProjectSUHA.Server.Models;

namespace newProjectSUHA.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NutiritionController : ControllerBase
    {

        private readonly MyDbContext _db;

        public NutiritionController(MyDbContext db)
        {
            _db = db;
        }

        //================ User Cycle ================
        [HttpGet("RecipesCategory")]
        public IActionResult Food()
        {
            var food = _db.RecipesCategories.ToList();
            return Ok(food);
        }



        [HttpGet("Recipes/{id}")]
        public IActionResult SubFood(int id)
        {
            var SubFood = _db.Recipes.Where(a => a.CategoryId == id).ToList();
            return Ok(SubFood);
        }

        [HttpGet("Recipesdetels/{id}")]
        public IActionResult Recipesdetels(int id)
        {
            var SubFood = _db.Recipes.Where(a => a.Id == id).FirstOrDefault();
            return Ok(SubFood);
        }


        [HttpGet("Tips")]
        public IActionResult Tips()
        {
            var Tips = _db.Tips.ToList();
            return Ok(Tips);
        }

        [HttpPost("TipsPost")]
        public IActionResult tipspost([FromForm] tipsDTO tipsdto)

        {

            var folder = Path.Combine(Directory.GetCurrentDirectory(), "Upload");
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }
            var imageFile = Path.Combine(folder, tipsdto.Image.FileName);

            using (var stream = new FileStream(imageFile, FileMode.Create))
            {
                tipsdto.Image.CopyToAsync(stream);
            }
            Tip tipsdata = new Tip()
            {
                Title = tipsdto.Title,
                Image = tipsdto.Image.FileName,
                Description = tipsdto.Description,
               

            };
            _db.Tips.Add(tipsdata);
            _db.SaveChanges();
            return Ok(tipsdata);
        }




        [HttpPut("Tipsput/{id}")]
        public async Task<IActionResult> tipsput(int id, tipsDTO tipsdto)
        {
            var data = await _db.Tips.FindAsync(id);

            var folder = Path.Combine(Directory.GetCurrentDirectory(), "Upload");
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }
            var imageFile = Path.Combine(folder, tipsdto.Image.FileName);

            using (var stream = new FileStream(imageFile, FileMode.Create))
            {
                tipsdto.Image.CopyToAsync(stream);
            }

            if (data == null)
            {
                return NotFound();
            }

            data.Title = tipsdto.Title;
            data.Description = tipsdto.Description;
            data.Image = tipsdto.Image.FileName;

            _db.Tips.Update(data);
            await _db.SaveChangesAsync();

            return Ok(data);
        }



        [HttpDelete("DeleteTips/{id}")]
        public IActionResult Deletetips(int id)
        {
            var data = _db.Tips.Find(id);
            if (data == null)
            {
                return NotFound();
            }
            _db.Tips.Remove(data);
            _db.SaveChanges();
            return Ok(data);
        }

        //================== Admin Cycle ==================
        [HttpGet("RecipesBlog")]
        public IActionResult GetLatestNews()
        {
            var blog = _db.Recipes

                .OrderByDescending(n => n.Id)
                .Take(5)
                .Select(n => new
                {
                    CategoryId = n.CategoryId, // Include PostId
                    Name = n.Name,
                    Image = n.Image,
                    Description = n.Description,
                    NutritionalFacts = n.NutritionalFacts
                })
                .ToList();

            return Ok(blog);
        }

       



        [HttpPost("recipepost")]
        public IActionResult recipepost([FromForm] RecipeDTO Recipedto)
        
            {

                var folder = Path.Combine(Directory.GetCurrentDirectory(), "Upload");
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }
            var imageFile = Path.Combine(folder, Recipedto.Image.FileName);

            using (var stream = new FileStream(imageFile, FileMode.Create))
            {
                Recipedto.Image.CopyToAsync(stream);
            }
            Recipe newitime = new Recipe()
            {
                Name = Recipedto.Name,
                Image = Recipedto.Image.FileName,
                Description = Recipedto.Description,
                NutritionalFacts = Recipedto.NutritionalFacts,
                CategoryId = Recipedto.CategoryId,

            };
            _db.Recipes.Add(newitime);
            _db.SaveChanges();
            return Ok(newitime);
        }



        [HttpPut("recipeput/{id}")]
        public async Task<IActionResult> UpdateClassAndGym(int id, RecipeDTO recipeDTO)
        {
            var data = await _db.Recipes.FindAsync(id);

            var folder = Path.Combine(Directory.GetCurrentDirectory(), "Upload");
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }
            var imageFile = Path.Combine(folder, recipeDTO.Image.FileName);

            using (var stream = new FileStream(imageFile, FileMode.Create))
            {
                recipeDTO.Image.CopyToAsync(stream);
            }

            if (data == null)
            {
                return NotFound();
            }

            data.Name = recipeDTO.Name;
            data.Description = recipeDTO.Description;
            data.CategoryId = recipeDTO.CategoryId;
            data.NutritionalFacts = recipeDTO.NutritionalFacts;
            data.Image = recipeDTO.Image.FileName;

            _db.Recipes.Update(data);
            await _db.SaveChangesAsync();

            return Ok(data);
        }



        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            var data = _db.Recipes.Find(id);
            if (data == null)
            {
                return NotFound();
            }
            _db.Recipes.Remove(data);
            _db.SaveChanges();
            return Ok(data);
        }


       
        [HttpGet("showallrecipe")]
        public IActionResult showallrecipe()
        {
            var food = _db.Recipes.ToList();
            return Ok(food);
        }


    }
}
