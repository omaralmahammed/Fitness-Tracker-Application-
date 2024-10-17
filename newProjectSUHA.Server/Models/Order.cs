using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace newProjectSUHA.Server.Models;

public partial class Order
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public decimal? Total { get; set; }

    public string? PaymentMethod { get; set; }

    public DateTime? Date { get; set; }

    [JsonIgnore]
    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual User? User { get; set; }
}
