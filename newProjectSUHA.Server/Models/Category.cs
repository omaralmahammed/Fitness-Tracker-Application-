using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace newProjectSUHA.Server.Models;

public partial class Category
{
    public int Id { get; set; }

    public string? Name { get; set; }

    [JsonIgnore]
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
