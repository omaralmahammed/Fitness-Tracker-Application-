using newProjectSUHA.Server.Models;

namespace newProjectSUHA.Server.Dtos
{
    public class RecipeDTO
    {

        public int? CategoryId { get; set; }

        public string? Name { get; set; }

        public string? Image { get; set; }

        public string? Description { get; set; }

        public string? NutritionalFacts { get; set; }

    }
}
