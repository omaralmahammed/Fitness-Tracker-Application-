using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace newProjectSUHA.Server.Models;

public partial class RecipesCategory
{
    public int Id { get; set; }

    public string? Name { get; set; }

    [JsonIgnore]
    public virtual ICollection<Recipe> Recipes { get; set; } = new List<Recipe>();
}
