using System;
using System.Collections.Generic;

namespace newProjectSUHA.Server.Models;

public partial class User
{
    public int Id { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }

    public string? PasswordHash { get; set; }

    public string? PasswordSalt { get; set; }

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual ICollection<Enrolled> Enrolleds { get; set; } = new List<Enrolled>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<Testimonial> Testimonials { get; set; } = new List<Testimonial>();
}
