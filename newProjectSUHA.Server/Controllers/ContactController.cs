using Azure.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using newProjectSUHA.Server.Dtos;
using newProjectSUHA.Server.Models;

namespace newProjectSUHA.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {

        private readonly MyDbContext _db;

        public ContactController(MyDbContext db)
        {
            _db = db;
        }

        // GET: api/Contact
        [HttpPost]
        public IActionResult Contact([FromForm] ContactDTO DTO)
        {
            var Contact = new ContactU
            {
                Name = DTO.Name,
                Subject = DTO.Subject,
                Email = DTO.Email,
                Message = DTO.Message,
                Status = "pending"
            };

            _db.ContactUs.Add(Contact);
            _db.SaveChanges();


            return Ok(Contact);
        }



        [HttpGet("contact")]
        public IActionResult GetContact()
        {
            var contact = _db.ContactUs.ToList();
            return Ok(contact);
        }

        [HttpGet("ContactStatus")]
        public IActionResult ContactStatus(int contactId)
        {
            var contact = _db.ContactUs.Find(contactId);
            if (contact == null)
            {
                return NotFound("Contact not found");
            }
            return Ok(contact);
        }


        [HttpPut("UpdateContactStatus/{contactId}")]
        public IActionResult UpdateContactStatus(int contactId)
        {

            var contact = _db.ContactUs.Find(contactId);

            if (contact == null)
            {
                return NotFound("Contact not found");
            }

            contact.Status = "Done";

            _db.ContactUs.Update(contact);
            _db.SaveChanges();

            return Ok(contact);
        }

        [HttpPut("Reject/{contactId}")]
        public IActionResult Reject(int contactId)
        {

            var contact = _db.ContactUs.Find(contactId);

            if (contact == null)
            {
                return NotFound("Contact not found");
            }

            contact.Status = "Reject";

            _db.ContactUs.Update(contact);
            _db.SaveChanges();

            return Ok(contact);
        }




    }
}
