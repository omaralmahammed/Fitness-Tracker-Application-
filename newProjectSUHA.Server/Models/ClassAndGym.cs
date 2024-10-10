using System;
using System.Collections.Generic;

namespace newProjectSUHA.Server.Models;

public partial class ClassAndGym
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Trainer { get; set; }

    public string? Description { get; set; }

    public decimal? Price { get; set; }

    public string? Flag { get; set; }

    public string? Image { get; set; }

    public virtual ICollection<AvailableTime> AvailableTimes { get; set; } = new List<AvailableTime>();

    public virtual ICollection<Subscription> Subscriptions { get; set; } = new List<Subscription>();
}
