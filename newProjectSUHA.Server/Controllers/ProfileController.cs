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
        [HttpGet("{id}")]
        public ActionResult<ProfileDTO> GetUserProfile(int id)
        {
            var user = _db.Users
                .Where(u => u.Id == id)
                .Select(u => new ProfileDTO
                {
                 
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Email = u.Email
                })
                .FirstOrDefault();

            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            return Ok(user);
        }

        // PUT: api/profile/{id}
        [HttpPut("{id}")]
        public IActionResult EditUserProfile(int id, [FromBody] ProfileDTO profileDto)
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
            user.FirstName = profileDto.FirstName;
            user.LastName = profileDto.LastName;
            user.Email = profileDto.Email;

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
