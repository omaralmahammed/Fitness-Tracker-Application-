using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using newProjectSUHA.Server.Dtos;
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

            if(type == "All")
            {
                var categoryItems = _db.ClassAndGyms.ToList();
                return Ok(categoryItems);
            }
            else
            {
                var categoryItems = _db.ClassAndGyms.Where(f => f.Flag == type).ToList();
                return Ok(categoryItems);
            }

            
        }


        [HttpGet("GetItemsDetails/{id}")]
        public IActionResult GetItemsDetails(int id)
        {

            var itemDetails = _db.ClassAndGyms.Find(id);

            return Ok(itemDetails);
        }

        [HttpGet("GetAvailableTime/{id}")]
        public IActionResult GetAvailableTime(int id)
        {

            var itemAvailableTimes = _db.AvailableTimes.OrderBy(c => c.StartTime).Where(c => c.ClassId == id).ToList();

            return Ok(itemAvailableTimes);
        }

        [HttpPost("AddAvailableTime")]
        public IActionResult AddAvailableTime([FromForm] AvailableTimeDTO addTime)
        {
            AvailableTime newTime = new AvailableTime()
            {
                ClassId = addTime.ClassId,
                StartTime = addTime.StartTime,
                EndTime = addTime.EndTime

            };

            _db.AvailableTimes.Add(newTime);
            _db.SaveChanges();

            return Ok(newTime);
        }

        [HttpGet("GetSubscription/{classId}")]
        public IActionResult GetSubscription(int classId)
        {

            var itemSubscriptions = _db.Subscriptions.OrderBy(d => d.Duration).Where(c => c.ClassId == classId).ToList();

            return Ok(itemSubscriptions);
        }


        [HttpPost("AddSubscriptions/{classId}")]
        public IActionResult AddSubscriptions([FromBody] SubscriptionDTO addSubscription, int classId)
        {
            var classInfo = _db.ClassAndGyms.Find(classId);

            if (classInfo == null)
            {
                return NotFound("Class not found");
            }

            var pricePerMonth = classInfo.Price;

            var durationInMonths = Convert.ToInt32(addSubscription.Duration);

            decimal discount = 0.10m;

            var totalPrice = durationInMonths * pricePerMonth;

            var discountAmount = totalPrice * discount;
            var finalPriceAfterDiscount = totalPrice - discountAmount;

            if (durationInMonths == 1) {
                finalPriceAfterDiscount = pricePerMonth;
            }

            Subscription newSubscription = new Subscription()
            {
                Duration = addSubscription.Duration,
                FinalPrice = finalPriceAfterDiscount,
                ClassId = classId
            };

            _db.Subscriptions.Add(newSubscription);
            _db.SaveChanges();

            return Ok(newSubscription);
        }

        [HttpPost("AddSubscriptionToEnrolled")]
        public IActionResult AddSubscriptionToEnrolled([FromBody] EnrolledRequestDTO subscriptionInfo)
        {
            var check = _db.Enrolleds.Where(s => s.ClassSubId == subscriptionInfo.ClassSubId).FirstOrDefault();

            
            if(check != null)
            {
                return BadRequest("You are already subscribed to this event. Please select a different event.");
            }

            var subscription = _db.Subscriptions.Find(subscriptionInfo.ClassSubId);

            Enrolled newOrder = new Enrolled()
            {
                UserId = subscriptionInfo.UserId,
                ClassSubId = subscriptionInfo.ClassSubId,
                ClassTimeId = subscriptionInfo.ClassTimeId,
                StartDate = DateTime.Now,
                EndDate = DateTime.Now.AddMonths(Convert.ToInt32(subscription.Duration)),
                PaymentMethod = "Active",
            };

            _db.Enrolleds.Add(newOrder);
            _db.SaveChanges();

            return Ok(newOrder);
        }
    }
}
