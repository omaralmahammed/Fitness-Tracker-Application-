import { Component, OnInit } from '@angular/core';
import { UrlService } from '../../../URL-Service/url.service';

@Component({
  selector: 'app-show-all-recipe',
  templateUrl: './show-all-recipe.component.html',
  styleUrl: './show-all-recipe.component.css'
})

export class ShowAllRecipeComponent implements OnInit {
  recipes: any[] = [];

  constructor(private recipeService: UrlService) { }

  ngOnInit(): void {
    this.recipeService.getallRecipes().subscribe(
      (data) => {
        this.recipes = data;
      },
      (error) => {
        console.error('Error fetching recipes', error);
      }
    );
  }
  }
