using System;
using System.Collections.Generic;

namespace newProjectSUHA.Server.Models;

public partial class AvailableTime
{
    public int Id { get; set; }

    public int? ClassId { get; set; }

    public DateTime? StartTime { get; set; }

    public DateTime? EndTime { get; set; }

    public virtual ClassAndGym? Class { get; set; }
}
