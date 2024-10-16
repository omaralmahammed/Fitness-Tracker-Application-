using Microsoft.AspNetCore.Mvc;
using newProjectSUHA.Server.Models;
using newProjectSUHA.Server.Dtos;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PayPal;

namespace newProjectSUHA.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GymAndClassAdminController : ControllerBase
    {
        private readonly MyDbContext _context;

        public GymAndClassAdminController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/GymAndClassAdmin/ClassAndGyms
        [HttpGet("ClassAndGyms")]
        public async Task<ActionResult<IEnumerable<ClassAndGymDto>>> GetClassAndGyms()
        {
            var classAndGyms = _context.ClassAndGyms
                .Select(c => new ClassAndGymDto
                {   
                    id = c.Id,
                    Name = c.Name,
                    Trainer = c.Trainer,
                    Description = c.Description,
                    Price = c.Price,
                    Flag = c.Flag,
                    Image = c.Image

                }).ToList();

            return Ok(classAndGyms);
        }


        // GET: api/GymAndClassAdmin/ClassAndGyms/5
        [HttpGet("ClassAndGyms/{id}")]
        public async Task<ActionResult<ClassAndGymDto>> GetClassAndGym(int id)
        {
            var classAndGym = await _context.ClassAndGyms.FindAsync(id);
            if (classAndGym == null)
            {
                return NotFound();
            }

            var classAndGymDto = new ClassAndGymDto
            {
                Name = classAndGym.Name,
                Trainer = classAndGym.Trainer,
                Description = classAndGym.Description,
                Price = classAndGym.Price,
                Flag = classAndGym.Flag,
            };

            return Ok(classAndGymDto);
        }

        // POST: api/GymAndClassAdmin/ClassAndGyms
        [HttpPost("ClassAndGyms")]
        public async Task<ActionResult<ClassAndGym>> CreateClassAndGym([FromForm] addGYMClassDTO classAndGymDto)
        {

            var folder = Path.Combine(Directory.GetCurrentDirectory(), "Upload");

            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }

            var fileImage = Path.Combine(folder, classAndGymDto.Image.FileName);

            if (!System.IO.File.Exists(fileImage))
            {
                using (var stream = new FileStream(fileImage, FileMode.Create))
                {

                    classAndGymDto.Image.CopyToAsync(stream);

                }
            }


            var classAndGym = new ClassAndGym
            {
                Name = classAndGymDto.Name,
                Trainer = classAndGymDto.Trainer,
                Description = classAndGymDto.Description,
                Price = classAndGymDto.Price,
                Flag = classAndGymDto.Flag,
                Image = classAndGymDto.Image.FileName
            };

            _context.ClassAndGyms.Add(classAndGym);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetClassAndGym), new { id = classAndGym.Id }, classAndGym);
        }

        // PUT: api/GymAndClassAdmin/ClassAndGyms/5
        [HttpPut("ClassAndGyms/{id}")]
        public async Task<IActionResult> UpdateClassAndGym(int id, ClassAndGymDto classAndGymDto)
        {
            var classAndGym = await _context.ClassAndGyms.FindAsync(id);
            if (classAndGym == null)
            {
                return NotFound();
            }

            classAndGym.Name = classAndGymDto.Name;
            classAndGym.Trainer = classAndGymDto.Trainer;
            classAndGym.Description = classAndGymDto.Description;
            classAndGym.Price = classAndGymDto.Price;
            classAndGym.Flag = classAndGymDto.Flag;
            classAndGym.Image = classAndGymDto.Image;

            _context.ClassAndGyms.Update(classAndGym);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/GymAndClassAdmin/ClassAndGyms/5
        [HttpDelete("ClassAndGyms/{id}")]
        public async Task<IActionResult> DeleteClassAndGym(int id)
        {
            var classAndGym = await _context.ClassAndGyms.FindAsync(id);
            if (classAndGym == null)
            {
                return NotFound();
            }

            _context.ClassAndGyms.Remove(classAndGym);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // GET: api/GymAndClassAdmin/SubscriptionsByClassId/5
  
        // Subscription CRUD
        // GET: api/GymAndClassAdmin/Subscriptions
        [HttpGet("Subscriptions")]
        public async Task<ActionResult<IEnumerable<SubscriptionDto>>> GetSubscriptions()
        {
            var subscriptions = _context.Subscriptions
                .Include(c=>c.Class)
                .Select(s => new SubscriptionDto
                {
                    id = s.Id,
                    Duration = s.Duration,
                    FinalPrice = s.FinalPrice,
                    ClassId = s.ClassId,
                    Name= s.Class.Name
                }).ToList();

            return Ok(subscriptions);
        }

      

        // POST: api/GymAndClassAdmin/Subscriptions
        [HttpPost("Subscriptions")]
        public async Task<ActionResult<Subscription>> CreateSubscription(SubscriptionDto subscriptionDto)
        {
            var subscription = new Subscription
            {
                Duration = subscriptionDto.Duration,
                FinalPrice = subscriptionDto.FinalPrice,
                ClassId = subscriptionDto.ClassId
            };

            _context.Subscriptions.Add(subscription);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSubscriptions), new { id = subscription.Id }, subscription);
        }

        // PUT: api/GymAndClassAdmin/Subscriptions/5
        [HttpPut("Subscriptions/{id}")]
        public async Task<IActionResult> UpdateSubscription(int id,[FromForm] SubscriptionDto subscriptionDto)
        {
            var subscription = await _context.Subscriptions.FindAsync(id);
            if (subscription == null)
            {
                return NotFound();
            }

            subscription.Duration = subscriptionDto.Duration;
            subscription.FinalPrice = subscriptionDto.FinalPrice;
            subscription.ClassId = subscriptionDto.ClassId;

            _context.Subscriptions.Update(subscription);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        //[HttpPut("Subscriptions/{id}")]
        //public IActionResult UpdateSubscription(int id , SubscriptionDto subscriptionDto)
        //{
        //    var subscription =_context.Subscriptions.FirstOrDefault(s => s.Id == id);
        //    if (subscription == null)
        //    {

        //    return NoContent(); }
        //    subscription.Duration = subscriptionDto.Duration;
        //    subscription.FinalPrice = subscriptionDto.FinalPrice;
        //    subscription.ClassId = subscriptionDto.ClassId;

        //    _context.Subscriptions.Update(subscription);
        //    _context.SaveChanges();
        //    return Ok(subscription);
        //}

        // DELETE: api/GymAndClassAdmin/Subscriptions/5
        [HttpDelete("Subscriptions/{id}")]
        public async Task<IActionResult> DeleteSubscription(int id)
        {
            var subscription = await _context.Subscriptions.FindAsync(id);
            if (subscription == null)
            {
                return NotFound();
            }

            _context.Subscriptions.Remove(subscription);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        // GET: api/GymAndClassAdmin/AvailableTimes
        [HttpGet("AvailableTimes")]
        public async Task<ActionResult<IEnumerable<AvailableTimeDto>>> GetAvailableTimes()
        {
            var availableTimes = _context.AvailableTimes
                .Select(a => new AvailableTimeDto
                {
                    StartTime = a.StartTime,
                    EndTime = a.EndTime,
                    ClassId = a.ClassId
                }).ToList();

            return Ok(availableTimes);
        }

        // GET: api/GymAndClassAdmin/AvailableTimes/5
        [HttpGet("AvailableTimes/{id}")]
        public async Task<ActionResult<AvailableTimeDto>> GetAvailableTime(int id)
        {
            var availableTime = await _context.AvailableTimes.FindAsync(id);
            if (availableTime == null)
            {
                return NotFound();
            }

            var availableTimeDto = new AvailableTimeDto
            {
                StartTime = availableTime.StartTime,
                EndTime = availableTime.EndTime,
                ClassId = availableTime.ClassId
            };

            return Ok(availableTimeDto);
        }

        // POST: api/GymAndClassAdmin/AvailableTimes
        [HttpPost("AvailableTimes")]
        public async Task<ActionResult<AvailableTime>> CreateAvailableTime(AvailableTimeDto availableTimeDto)
        {
            var availableTime = new AvailableTime
            {
                StartTime = availableTimeDto.StartTime,
                EndTime = availableTimeDto.EndTime,
                ClassId = availableTimeDto.ClassId
            };

            _context.AvailableTimes.Add(availableTime);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAvailableTime), new { id = availableTime.Id }, availableTime);
        }

        // PUT: api/GymAndClassAdmin/AvailableTimes/5
        [HttpPut("AvailableTimes/{id}")]
        public async Task<IActionResult> UpdateAvailableTime(int id, AvailableTimeDto availableTimeDto)
        {
            var availableTime = await _context.AvailableTimes.FindAsync(id);
            if (availableTime == null)
            {
                return NotFound();
            }

            availableTime.StartTime = availableTimeDto.StartTime;
            availableTime.EndTime = availableTimeDto.EndTime;
            availableTime.ClassId = availableTimeDto.ClassId;

            _context.AvailableTimes.Update(availableTime);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/GymAndClassAdmin/AvailableTimes/5
        [HttpDelete("AvailableTimes/{id}")]
        public async Task<IActionResult> DeleteAvailableTime(int id)
        {
            var availableTime = await _context.AvailableTimes.FindAsync(id);
            if (availableTime == null)
            {
                return NotFound();
            }

            _context.AvailableTimes.Remove(availableTime);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("SubscriptionsByClassId/{classId}")]
        public async Task<ActionResult<IEnumerable<SubscriptionDto>>> GetSubscriptionsByClassId(int classId)
        {
            var subscriptions = await _context.Subscriptions
                .Where(s => s.ClassId == classId)
                .Include(s => s.Class) // Include the related Class entity
                .Select(s => new SubscriptionDto
                {
                    id = s.Id,
                    Duration = s.Duration,
                    FinalPrice = s.FinalPrice,
                    ClassId = s.ClassId,
                 
                })
                .ToListAsync();

            if (!subscriptions.Any())
            {
                return NotFound($"No subscriptions found for class with ID {classId}");
            }

            return Ok(subscriptions);
        }
    }
}
