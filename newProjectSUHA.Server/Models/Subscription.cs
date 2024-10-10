using System;
using System.Collections.Generic;

namespace newProjectSUHA.Server.Models;

public partial class Subscription
{
    public int Id { get; set; }

    public string? Duration { get; set; }

    public decimal? FinalPrice { get; set; }

    public int? ClassId { get; set; }

    public virtual ClassAndGym? Class { get; set; }

    public virtual ICollection<Enrolled> Enrolleds { get; set; } = new List<Enrolled>();
}
