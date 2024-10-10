using System;
using System.Collections.Generic;

namespace newProjectSUHA.Server.Models;

public partial class Tip
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? Image { get; set; }
}
