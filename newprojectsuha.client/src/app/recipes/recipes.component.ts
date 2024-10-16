import { Component, OnInit } from '@angular/core';
import { UrlService } from '../URL-Service/url.service';
import { ActivatedRoute } from '@angular/router';
import { RecipesCategoriesComponent } from '../recipes-categories/recipes-categories.component';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit {

  arrayOfItems: any[] = []; 
  categoryId: number | null = null;

  constructor(private route: ActivatedRoute, private _ser: UrlService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryId = Number(params.get('id')); 
      if (this.categoryId) {
        this.getRecipesByCategory(this.categoryId); 
      }
    });

    debugger
  }

  getRecipesByCategory(categoryId: number) {
    this._ser.getRecipesByCategory(categoryId).subscribe((data: any[]) => {
      this.arrayOfItems = data;
      console.log(this.arrayOfItems, 'get recipes');
    }, error => {
      console.error('error getting data', error);
    });
  }
  

}
