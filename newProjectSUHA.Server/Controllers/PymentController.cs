using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using newProjectSUHA.Server.Dtos;
using newProjectSUHA.Server.Models;
using newProjectSUHA.Server.Services;
using PayPal.Api;
using MailKit.Security;
using MimeKit;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace newProjectSUHA.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PymentController : ControllerBase
    {
        private readonly MyDbContext _db;
        string _redirectUrl;
        private PayPalPaymentService payPalService;
        private readonly EmailService _emailService;
        private readonly TimeSpan _interval = TimeSpan.FromMinutes(1);


        public PymentController(MyDbContext db, IConfiguration config, PayPalPaymentService paypal, EmailService emailService, IServiceProvider serviceProvider)
        {

            _db = db;

            _redirectUrl = config["PayPal:RedirectUrl"] + "/api/Pyment";

            payPalService = paypal;
            _emailService = emailService;

            //_serviceProvider = serviceProvider;


        }


        [HttpPost("checkoutForSubscription")]
        public IActionResult CreatePayment([FromBody] EnrolledRequestDTO orderInfo)
        {
            var checkSubscription = _db.Enrolleds.Where(u => u.UserId == orderInfo.UserId && u.ClassSubId == orderInfo.ClassSubId && u.PaymentMethod == "Active").FirstOrDefault();

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




        [HttpPost("SendReminderEmailsAsync")]
        public async Task<IActionResult> SendReminderEmailsAsync()
        {
            var currentDate = DateTime.Now.Date;
            var reminderDate = currentDate.AddDays(5).Date;

            var subscriptions = await _db.Enrolleds
                    .Include(e => e.ClassSub) 
                    .ThenInclude(cs => cs.Class) 
                    .Include(e => e.User)
                    .Where(e => e.EndDate > currentDate && e.EndDate <= reminderDate)
                    .ToListAsync();


            if (!subscriptions.Any())
            {
                return Ok("No subscriptions ending in 5 days.");
            }

            foreach (var subscription in subscriptions)
            {
                if (subscription.User != null && !string.IsNullOrWhiteSpace(subscription.User.Email))
                {
                    string subject = "Your Subscription is Ending Soon";
                    string body = $@"
                                    <p>Dear {subscription.User.FirstName} {subscription.User.LastName} ,</p>
                                    <p>This is a reminder that your subscription for {subscription.ClassSub.Duration} months subscription in {subscription.ClassSub.Class.Name} {subscription.ClassSub.Class.Flag} will end on {subscription.EndDate:MMMM dd, yyyy}.</p>
                                    <p>We encourage you to renew your subscription before it expires to continue enjoying our services.</p>
                                    <p>If you have any questions or need assistance, feel free to contact us.</p>
                                    <p>Thank you for being a valued member!</p>
                                    <p>Best regards,</p>
                                    <p>The support Team</p>
                                ";

                    await _emailService.SendEmailRAsync(subscription.User.Email, subject, body);
                }
            }

            return Ok(subscriptions);
        }


        [HttpPost("SendEmailsEndSubscription")]
        public async Task<IActionResult> SendEmailsEndSubscription()
        {
            var currentDate = DateTime.Now;

            var subscriptions = await _db.Enrolleds
                .Include(e => e.ClassSub)
                .ThenInclude(cs => cs.Class)
                .Include(sub => sub.User)
                .Where(sub => sub.EndDate <= currentDate && sub.PaymentMethod != "Inactive")
                .ToListAsync();

            if (!subscriptions.Any())
            {
                return Ok("No subscriptions have ended.");
            }

            foreach (var subscription in subscriptions)
            {
                if (subscription.User != null && !string.IsNullOrWhiteSpace(subscription.User.Email))
                {
                    string subject = "Your Subscription Has Ended";
                    string body = $@"
                                    <p>Dear {subscription.User.FirstName} {subscription.User.LastName} ,</p>
                                    <p>We wanted to inform you that your {subscription.ClassSub.Duration} months subscription in {subscription.ClassSub.Class.Name} {subscription.ClassSub.Class.Flag} has ended as of {subscription.EndDate:MMMM dd, yyyy}. We hope you enjoyed the benefits of your subscription and found value in our services.</p>
                                    <p>If you'd like to renew your subscription or explore other offers, please visit your account or contact us for assistance.</p>
                                    <p>Thank you for being a valued member!</p>
                                    <p>Best regards,</p>
                                    <p>The Support Team</p>
                                ";

                    await _emailService.SendEmailRAsync(subscription.User.Email, subject, body);
                }

                // Mark subscription as inactive
                subscription.PaymentMethod = "Inactive";
                _db.Enrolleds.Update(subscription);
            }

            // Save changes once for all updates
            await _db.SaveChangesAsync();

            return Ok("End of subscription emails sent and subscriptions marked as inactive.");
        }



      
    }
}
