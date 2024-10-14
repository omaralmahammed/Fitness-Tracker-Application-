import { Component, OnInit } from '@angular/core';
import { UrlService } from '../URL-Service/url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent implements OnInit {

  recipeId: number | null = null;

  constructor(private route: ActivatedRoute, private _ser: UrlService) { }

  ngOnInit(): void {
  
    this.route.paramMap.subscribe(params => {
      this.recipeId = Number(params.get('id')); 
      if (this.recipeId) {
        this.getRecipeDetails(this.recipeId); 
      }
    });
  }

  recipeDetails: any;


  getRecipeDetails(recipeId: number) {
    this._ser.getRecipeDetails(recipeId).subscribe((data: any) => {
      this.recipeDetails = data; 
      console.log('Recipe details:', this.recipeDetails); 
    }, error => {
      console.error('Error fetching recipe details:', error);
    });
  }
}
