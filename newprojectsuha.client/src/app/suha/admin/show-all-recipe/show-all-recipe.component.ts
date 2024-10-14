import { Component, OnInit } from '@angular/core';
import { UrlService } from '../../../URL-Service/url.service';

@Component({
  selector: 'app-show-all-recipe',
  templateUrl: './show-all-recipe.component.html',
  styleUrl: './show-all-recipe.component.css'
})

export class ShowAllRecipeComponent  {
  ngOnInit() {

    this.getRecipe();
  }
  constructor(private _ser: UrlService) {


  }

  RecipeArray: any
  getRecipe() {
    this._ser.getallRecipes().subscribe((data) => {
      this.RecipeArray = data
      console.log(this.RecipeArray, "this.RecipeArray")
    })

  }

  deleteRecipe(id: any) {
    this._ser.deleteRecipe(id).subscribe(() => {
      alert("delete Recipe successfully")
      this.getRecipe()
    })
  }


  }

