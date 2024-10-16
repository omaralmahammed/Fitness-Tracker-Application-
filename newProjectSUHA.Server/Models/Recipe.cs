using System;
using System.Collections.Generic;

namespace newProjectSUHA.Server.Models;

public partial class Recipe
{
    public int Id { get; set; }

    public int? CategoryId { get; set; }

    public string? Name { get; set; }

    public string? Image { get; set; }

    public string? Description { get; set; }

    public string? NutritionalFacts { get; set; }

    public string? Ingredients { get; set; }

    public virtual RecipesCategory? Category { get; set; }
}
