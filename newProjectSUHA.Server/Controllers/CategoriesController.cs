using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using newProjectSUHA.Server.Dtos;
using newProjectSUHA.Server.Models;

namespace newProjectSUHA.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly MyDbContext _db;

        public CategoriesController(MyDbContext db)
        {
            _db = db;
        }
        // All Categories

        [HttpGet]
        [Route("AllCategories")]
        public IActionResult GetAllCategories()
        {
            var data = _db.Categories.ToList();
            return Ok(data);
        }
        //--------------------------------------------------------------------------------------------------------------------
        //--------------------------------------------------------------------------------------------------------------------
        //Get Category By Id

        [HttpGet]
        [Route("GetCategoryById/{id}")]

        public IActionResult GetCategoryById(int id)
        {
            var data = _db.Categories.Find(id);
            if (data == null)
            {
                return NotFound(new { message = "Category not found" });
            }
            return Ok(data);
        }
        //--------------------------------------------------------------------------------------------------------------------
        //--------------------------------------------------------------------------------------------------------------------
        //Get Category By Name
        [HttpGet]
        [Route("Category/{name}")]
        public IActionResult GetCategoryByName(string name)
        {
            var data = _db.Categories.FirstOrDefault(c => c.Name == name);
            if (data == null)
            {
                return NotFound(new { message = "Category not found" });
            }
            return Ok(data);
        }

        //--------------------------------------------------------------------------------------------------------------------
        //--------------------------------------------------------------------------------------------------------------------


        // Get products by category ID sorted by price descending
        [HttpGet("ProductsByCategoryId/{categoryId}")]
        public IActionResult GetProductsByCategoryId(int categoryId)
        {
            var products = _db.Products
                              .Where(x => x.CategoryId == categoryId)
                              .OrderByDescending(x => x.Price) // ترتيب المنتجات حسب السعر من الأعلى إلى الأقل
                              .ToList();
            return Ok(products);
        }



        //--------------------------------------------------------------------------------------------------------------------
        //--------------------------------------------------------------------------------------------------------------------
        // Get products by category ID sorted by price ascending
        [HttpGet("ProductsByCategoryId2/{categoryId}")]
        public IActionResult GetProductsByCategoryId2(int categoryId)
        {
            var products = _db.Products
                              .Where(x => x.CategoryId == categoryId)
                              .OrderBy(x => x.Price) // ترتيب المنتجات حسب السعر من الأصغر إلى الأكبر
                              .ToList();
            return Ok(products);
        }

        /*        --------------------------------------------------------------------------------------
        */        /*        ----------------------------------------------------------------------------------------------------
        */


        // Add Category


        [HttpPost]
        [Route("AddCategory")]
        public IActionResult AddCategory([FromForm] categoryRequestDTO categoryDto)
        {




            var dataResponse = new Category
            {
                Name = categoryDto.Name
            };

            _db.Categories.Add(dataResponse);
            _db.SaveChanges();

            return Ok(new { message = "Category added successfully", dataResponse });
        }


        //-------------------------------------------------------------------------------------------------
        //-------------------------------------------------------------------------------------------------




        //Update Category




        [HttpPut("{id}")]
        public IActionResult UpdateCategory(int id, [FromForm] categoryRequestDTO category)
        {
            // Step 1: Find the existing category by ID
            var existingCategory = _db.Categories.Find(id);
            if (existingCategory == null)
            {
                return NotFound(new { message = "Category not found" });
            }

            // Step 2: Update the category name
            existingCategory.Name = category.Name;


            _db.Categories.Update(existingCategory);
            _db.SaveChanges();

            //Return a success response
            return Ok(new { message = "Category updated successfully", category = existingCategory });
        }

        /*        ----------------------------------------------------------------------------------------------------
*//*        ----------------------------------------------------------------------------------------------------
*/

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult DeleteCategory(int id)
        {
            var data = _db.Categories.Find(id);
            if (data == null)
            {
                return NotFound(new { message = "Category not found" });
            }
            _db.Products.RemoveRange(data.Products);
            _db.Categories.Remove(data);
            _db.SaveChanges();
            return Ok(new { message = "Category deleted", category = data });
        }
    }
}