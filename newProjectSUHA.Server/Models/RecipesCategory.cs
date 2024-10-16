using System;
using System.Collections.Generic;

namespace newProjectSUHA.Server.Models;

public partial class RecipesCategory
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<Recipe> Recipes { get; set; } = new List<Recipe>();
}
