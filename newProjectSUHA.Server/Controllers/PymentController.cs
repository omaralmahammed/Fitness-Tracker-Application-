using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using newProjectSUHA.Server.Dtos;
using newProjectSUHA.Server.Models;
using newProjectSUHA.Server.Services;
using PayPal.Api;

namespace newProjectSUHA.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PymentController : ControllerBase
    {
        private readonly MyDbContext _db;
        string _redirectUrl;
        private PayPalPaymentService payPalService;

        public PymentController(MyDbContext db, IConfiguration config, PayPalPaymentService paypal)
        {

            _db = db;

            _redirectUrl = config["PayPal:RedirectUrl"] + "/api/Pyment";

            payPalService = paypal;
        }


        [HttpPost("checkoutForSubscription")]
        public IActionResult CreatePayment([FromBody] EnrolledRequestDTO orderInfo)
        {
            var checkSubscription = _db.Enrolleds.Where(u => u.UserId == orderInfo.UserId && u.ClassSubId == orderInfo.ClassSubId).FirstOrDefault();

            if (checkSubscription != null)
            {

                return BadRequest("You are already subscribed to this event. Please select a different event.");
            }

            if (string.IsNullOrEmpty(_redirectUrl))
                throw new Exception("The redirect link for the paypal should be set correctly on the sitting app.");


            var totalPrice = _db.Subscriptions.Find(orderInfo.ClassSubId).FinalPrice ?? 0;
            var payment = payPalService.CreatePayment(_redirectUrl ?? " ", totalPrice, null, orderInfo.UserId, orderInfo.ClassSubId, orderInfo.ClassTimeId);
            var approvalUrl = payment.links.FirstOrDefault(l => l.rel.Equals("approval_url", StringComparison.OrdinalIgnoreCase))?.href;

            return Ok(new { approvalUrl });
        }

        [HttpGet("success")]
        public IActionResult ExecutePayment(string paymentId, string PayerID, string token, int userId, int subscriptionId, int timeId)
        {
            var subscription = _db.Subscriptions.Find(subscriptionId);

            Enrolled newOrder = new Enrolled()
            {
                UserId = userId,
                ClassSubId = subscriptionId,
                ClassTimeId = timeId,
                StartDate = DateTime.Now,
                EndDate = DateTime.Now.AddMonths(Convert.ToInt32(subscription.Duration)),
                PaymentMethod = "Active",
            };

            _db.Enrolleds.Add(newOrder);
            _db.SaveChanges();


            var executedPayment = payPalService.ExecutePayment(paymentId, PayerID, userId, subscriptionId, timeId);
            const string script = "<script>window.close();</script>";
            return Content(script, "text/html");
        }

        [HttpGet("cancel")]
        public IActionResult CancelPayment()
        {
            return BadRequest("Payment canceled.");
        }
    }
}
