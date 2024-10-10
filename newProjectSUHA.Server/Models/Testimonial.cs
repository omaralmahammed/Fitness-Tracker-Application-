using System;
using System.Collections.Generic;

namespace newProjectSUHA.Server.Models;

public partial class Testimonial
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public string? Content { get; set; }

    public string? Status { get; set; }

    public virtual User? User { get; set; }
}
