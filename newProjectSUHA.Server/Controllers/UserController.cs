using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using newProjectSUHA.Server.Dtos;
using newProjectSUHA.Server.Models;

namespace newProjectSUHA.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly MyDbContext _db;
        public UserController(MyDbContext db)
        {
            _db = db;
        }


        [HttpPost("Register")]
        public IActionResult register([FromForm] RegieterDTO DTO)
        {
            if (DTO.Password != DTO.ConfirmPassword)
            {
                return BadRequest("Passwords do not match");
            }
            //byte[] passwordHash;
            //byte[] passwordSalt;
            passwordHasherMethod.CreatePasswordHash(DTO.Password, out string passwordHash, out string passwordSalt);

            var NewUser = new User
            {
                FirstName = DTO.FirstName,
                LastName = DTO.LastName,
                Email = DTO.Email,
                Password = DTO.Password,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt

            };
            _db.Users.Add(NewUser);
            _db.SaveChanges();

            var userId = NewUser.Id;

            var NewUserCart = new Cart
            {
                UserId = userId

            };
            _db.Carts.Add(NewUserCart);
            _db.SaveChanges();
            return Ok();
        }


        [HttpPost("LOGIN")]
        public IActionResult login( [FromForm]  LogInDTO dto)
        {
            var user = _db.Users.FirstOrDefault(x => x.Email == dto.Email);


            if (User == null || !passwordHasherMethod.VerifyPassword(dto.Password, user.PasswordHash, user.PasswordSalt))
            {
                return Unauthorized("Invalid username or password.");
            }
            return Ok(user);


        }


        [HttpGet("GetAllUsers")]
        public IActionResult GetAllUsers()
        {
            var Users = _db.Users.ToList();
            return Ok(Users);
        }



    
}
}