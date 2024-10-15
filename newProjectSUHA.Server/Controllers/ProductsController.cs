using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using newProjectSUHA.Server.Dtos;
using newProjectSUHA.Server.Models;

namespace newProjectSUHA.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly MyDbContext _db;

        public ProductsController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("AllProducts")]
        public IActionResult GetAllProducts()
        {
            // Fetch products and include the associated category
            var data = _db.Products.Include(p => p.Category).ToList();

            // Return the raw data (including product and category information)
            return Ok(data);
        }



        // Get Last 3 Products by CategoryId
        [HttpGet("GetLast3ProductsByCategory/{categoryId}")]
        public IActionResult GetLast3ProductsByCategory(int categoryId)
        {
            // Fetch products that match the given categoryId
            var productsByCategory = _db.Products
                                         .Where(p => p.CategoryId == categoryId)
                                         .OrderByDescending(p => p.Id) // Assuming there's a CreatedAt property
                                         .Take(3) // Get the last 3 products
                                         .ToList();

            return Ok(productsByCategory);
        }
        // Get 3 Random Products by ProductId, excluding the product itself
        [HttpGet("GetRandom3ProductsByCategory/{excludeProductId}")]
        public IActionResult GetRandom3ProductsByCategory(int excludeProductId)
        {
            // Fetch the product to get its categoryId
            var product = _db.Products.FirstOrDefault(p => p.Id == excludeProductId);

            if (product == null)
            {
                return NotFound("Product not found");
            }

            int? categoryId = product.CategoryId;

            // Fetch products that match the categoryId and exclude the specified product
            var randomProductsByCategory = _db.Products
                                              .Where(p => p.CategoryId == categoryId && p.Id != excludeProductId) // Exclude the specified product
                                              .OrderBy(p => Guid.NewGuid()) // Order by random GUID to shuffle the products
                                              .Take(3) // Get 3 random products
                                              .ToList();

            return Ok(randomProductsByCategory);
        }





        // Get Last3 INDEX products
        [HttpGet("GetLast3Products")]
        public IActionResult GetLast3Products()
        {

            var data = _db.Products.OrderBy(p => p.Name).ToList();
            var lastFiveProducts = data.TakeLast(3).ToList();

            return Ok(lastFiveProducts);

        }





        [Authorize]
        // Get products by category ID
        [HttpGet("ProductsByCategoryId/{categoryId}")]
        public IActionResult GetProductsByCategoryId(int categoryId)
        {
            var products = _db.Products.Where(x => x.CategoryId == categoryId).ToList();
            return Ok(products);
        }


        // Get a single product by ID
        [HttpGet("Product/{id}")]
        public IActionResult GetProductById(int id)
        {
            var data = _db.Products.FirstOrDefault(p => p.Id == id);
            if (data == null)
            {
                return NotFound();
            }
            return Ok(data);
        }

        // Get product by ID with a name filter
        [HttpGet("ProductByName/{id:int:max(10)}")]
        public IActionResult GetProductByIdAndName(int id, [FromQuery] string name)
        {
            var data = _db.Products.FirstOrDefault(c => c.Id == id && c.Name == name);
            if (data == null)
            {
                return NotFound();
            }
            return Ok(data);
        }




        /*        ----------------------------------------------------------------------------------------------------
        *//*        ----------------------------------------------------------------------------------------------------
        */

        [HttpPost]
        [Route("AddProduct")]
        public IActionResult CreateProduct([FromForm] ProductRequestDTO productDto)
        {
            // Ensure the "Upload" directory exists
            var uploadedFolder = Path.Combine(Directory.GetCurrentDirectory(), "Upload");
            if (!Directory.Exists(uploadedFolder))
            {
                Directory.CreateDirectory(uploadedFolder);
            }

            // Save the uploaded image file
            var fileImagePath = Path.Combine(uploadedFolder, productDto.Image.FileName);
            using (var stream = new FileStream(fileImagePath, FileMode.Create))
            {
                productDto.Image.CopyTo(stream);
            }

            // Prepare the data to be saved in the database as a new Product
            var product = new Product
            {
                Name = productDto.Name,
                Description = productDto.Description,
                Price = productDto.Price,
                CategoryId = productDto.CategoryId,
                Image = productDto.Image.FileName // Store just the file name or the relative path
            };

            // Add the product to the database and save changes
            _db.Products.Add(product);
            _db.SaveChanges();

            // Return a success response
            return Ok(new { message = "Product added successfully", product });
        }



        /*        ----------------------------------------------------------------------------------------------------
*//*        ----------------------------------------------------------------------------------------------------
*/


        [HttpPut("UpdateProduct/{id}")]
        public IActionResult UpdateProduct(int id, [FromForm] ProductRequestDTO Product)
        {
            // Find the existing product by ID
            var existingProduct = _db.Products.FirstOrDefault(p => p.Id == id);
            if (existingProduct == null)
            {
                return NotFound(new { message = "Product not found" });
            }

            // Validate the incoming model
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Ensure the "Product" directory exists
            var uploadedFolder = Path.Combine(Directory.GetCurrentDirectory(), "Upload");
            if (!Directory.Exists(uploadedFolder))
            {
                Directory.CreateDirectory(uploadedFolder);
            }

            // Save the uploaded image file if provided
            if (Product.Image != null)
            {
                var fileImage = Path.Combine(uploadedFolder, Product.Image.FileName);
                using (var stream = new FileStream(fileImage, FileMode.Create))
                {
                    Product.Image.CopyTo(stream);
                }

                // Update the image path
                existingProduct.Image = Product.Image.FileName;
            }

            // Update the existing product's properties with the new values
            existingProduct.Name = Product.Name;
            existingProduct.Description = Product.Description;
            existingProduct.Price = Product.Price;

            // Save changes to the database
            _db.Products.Update(existingProduct);
            _db.SaveChanges();

            // Return a success response with the updated product
            return Ok(new { message = "Product updated successfully", product = existingProduct });
        }


        /*        ----------------------------------------------------------------------------------------------------
*/        /*        ----------------------------------------------------------------------------------------------------
*/



        // Delete a product by ID
        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            var data = _db.Products.Find(id);
            if (data == null)
            {
                return NotFound();
            }
            _db.Products.Remove(data);
            _db.SaveChanges();
            return Ok(data);
        }










        [HttpGet("getImages/{imageName}")]
        public IActionResult getImage(string imageName)
        {
            var pathImage = Path.Combine(Directory.GetCurrentDirectory(), "Upload", imageName);
            if (System.IO.File.Exists(pathImage))
            {
                return PhysicalFile(pathImage, "image/jpeg");
            }
            return NotFound();
        }




        // Search products by name
        [HttpGet("SearchByName")]
        public IActionResult SearchProductsByName([FromQuery] string name)
        {
            // If no name is provided, return a Bad Request response
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest(new { message = "Name parameter is required." });
            }

            // Search for products where the name contains the search term (case-insensitive)
            var matchingProducts = _db.Products
                                      .Where(p => p.Name.Contains(name))  // Case-sensitive
                                                                          // .Where(p => p.Name.ToLower().Contains(name.ToLower()))  // Uncomment for case-insensitive search
                                      .Include(c => c.Category)  // Include related Category
                                      .ToList();

            // If no matching products found, return an empty result
            if (!matchingProducts.Any())
            {
                return NotFound(new { message = "No products found matching the search term." });
            }

            // Return the list of matching products
            return Ok(matchingProducts);
        }
   
    }
}