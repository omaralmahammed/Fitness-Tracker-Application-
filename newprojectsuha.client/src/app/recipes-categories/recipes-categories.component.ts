import { Component } from '@angular/core';
import { UrlService } from '../URL-Service/url.service';

@Component({
  selector: 'app-recipes-categories',
  templateUrl: './recipes-categories.component.html',
  styleUrl: './recipes-categories.component.css'
})
export class RecipesCategoriesComponent {
  getSRecipe: any;

  ngOnInit() {
    this.getCategorieRecipes();
  }

  constructor(private _ser: UrlService ) { }

 categorieArray: any
  getCategorieRecipes() {

    this._ser.getCategorieRecipe().subscribe((data) => {
      this.categorieArray = data
      console.log(this.categorieArray, "this.categorieArray");
    })
  }
}
