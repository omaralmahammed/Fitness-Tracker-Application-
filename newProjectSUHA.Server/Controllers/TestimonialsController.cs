using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using newProjectSUHA.Server.Dtos;
using newProjectSUHA.Server.Models;

namespace newProjectSUHA.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestimonialsController : ControllerBase
    {
        private readonly MyDbContext _db;

        public TestimonialsController(MyDbContext db)
        {
            _db = db;
        }


        [HttpGet]
        public IActionResult getAllTestimonial()
        {
            var testimonials = _db.Testimonials
                .Where(t => t.Status == "Accepted")
                .Include(t => t.User) 
                .Select(t => new
                {
                    Content = t.Content,
                    UserName = t.User != null ? t.User.FirstName + " " + t.User.LastName : "Unknown User"
                })
                .ToList();

            return Ok(testimonials);
        }

        [HttpGet("getAllTestimonialInAdmin")]
        public IActionResult getAllTestimonialInAdmin()
        {
            var testimonials = _db.Testimonials
                .Include(t => t.User)
                .Select(t => new
                {
                    id=t.Id,
                    Content = t.Content,
                    Status=t.Status,
                    UserName = t.User != null ? t.User.FirstName + " " + t.User.LastName : "Unknown User"
                })
                .ToList();

            return Ok(testimonials);
        }


        [HttpPost]
        public IActionResult postTestimonial([FromForm] TestimonialDTO testimonialDto) 
        {


            var testimonial = new Testimonial
            {
                UserId = testimonialDto.UserId, 
                Content = testimonialDto.Content,
                Status = "Pending" 
            };

            _db.Testimonials.Add(testimonial);
            _db.SaveChanges();
            return Ok(testimonial);
        }



        [HttpPut("updateTestimonialStatus/{id}")]
        public IActionResult UpdateTestimonialStatus(int id, [FromBody] TestimonialStatusUpdateRequestDTO request)
        {
            var newStatus = request.Status;

            if (string.IsNullOrEmpty(newStatus))
            {
                return BadRequest("Status is required.");
            }

            var validStatuses = new List<string> { "Accepted", "Rejected", "Pending" };

            if (!validStatuses.Contains(newStatus))
            {
                return BadRequest("Invalid status value");
            }

            var existingTestimonial = _db.Testimonials.Find(id);
            if (existingTestimonial == null)
            {
                return NotFound("Testimonial not found");
            }

            existingTestimonial.Status = newStatus;
            _db.Testimonials.Update(existingTestimonial);
            _db.SaveChanges();

            return Ok(new { message = "Testimonial status updated successfully", status = existingTestimonial.Status });
        }


        //[HttpPut("updateTestimonialStatus/{id}")]
        //public IActionResult updateTestimonialStatus(int id)
        //{
        //    var existingTestimonial = _db.Testimonials.Find(id);
        //    if (existingTestimonial == null)
        //    {
        //        return NotFound("Testimonial not found");
        //    }

        //    existingTestimonial.Status = "Accepted";
        //    _db.Testimonials.Update(existingTestimonial);
        //    _db.SaveChanges(); 

        //    return Ok(new { message = "Testimonial status updated successfully", status = existingTestimonial.Status });
        //}




        //[HttpPut("updateRejectTestimonialStatus/{id}")]
        //public IActionResult updateRejectTestimonialStatus(int id)
        //{
        //    var existingTestimonial = _db.Testimonials.Find(id);
        //    if (existingTestimonial == null)
        //    {
        //        return NotFound("Testimonial not found");
        //    }

        //    existingTestimonial.Status = "Reject";
        //    _db.Testimonials.Update(existingTestimonial);
        //    _db.SaveChanges();

        //    return Ok(new { message = "Testimonial status updated successfully", status = existingTestimonial.Status });
        //}


        [HttpDelete("{id}")]
        public IActionResult deleteTestimonial(int id)
        {
            var testimonial = _db.Testimonials.Find(id);
            if (testimonial == null)
            {
                return NotFound();
            }

            _db.Testimonials.Remove(testimonial);
            _db.SaveChanges(); 

            return NoContent();
        }




    }
}
