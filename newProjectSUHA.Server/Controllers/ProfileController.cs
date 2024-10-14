using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using newProjectSUHA.Server.Dtos;
using newProjectSUHA.Server.Models;

namespace newProjectSUHA.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly MyDbContext _db;

        public ProfileController(MyDbContext db)
        {
            _db = db;
        }

        // GET: api/profile/{id}
        [HttpGet("GetUserProfile/{id}")]
        public IActionResult GetUserProfile(int id)
        {
            var user = _db.Users.Find(id);
                

            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            return Ok(user);
        }

        // PUT: api/profile/{id}
        [HttpPut("EditUserProfile/{id}")]
        public IActionResult EditUserProfile(int id, [FromForm] ProfileDTO profileDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Find the user by ID
            var user = _db.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            // Update the user profile fields
            user.FirstName = profileDto.FirstName?? user.FirstName;
            user.LastName = profileDto.LastName ?? user.LastName;
            user.Email = profileDto.Email ?? user.Email;
            

            try
            {
                 _db.SaveChanges();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while updating the profile", error = ex.Message });
            }

            return NoContent(); // Return 204 No Content for successful update
        }
    }
}
