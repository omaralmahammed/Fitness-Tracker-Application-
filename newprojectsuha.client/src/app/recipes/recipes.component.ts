import { Component } from '@angular/core';
import { UrlService } from '../URL-Service/url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {



  classId: any

  ngOnInit() {
    this.classId = this._route.snapshot.paramMap.get("id");

    this.getSRecipe(this.classId)
  }
  constructor(private _ser: UrlService, private _route: ActivatedRoute) { }


  arrayOfSubscriptions: any

  getSRecipe(id: number) {
    this._ser.getSRecipe(id).subscribe((data) => {
      console.log(data);
      this.arrayOfSubscriptions = data;
    })
  }

}
