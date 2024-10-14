import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrlService } from '../../../URL-Service/url.service';

@Component({
  selector: 'app-recipe-dashboard',
  templateUrl: './recipe-dashboard.component.html',
  styleUrl: './recipe-dashboard.component.css'
})


export class RecipeDashboardComponent  {
 
  ngOnInit() {
   this.GetCategoryName()
  }

  constructor(private _ser: UrlService) { }

  image: any
  changeImage(event: any) {
    this.image = event.target.files[0]
  }

  addNewRecipe(data: any) {

    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
    }

    form.append("Image", this.image)
    this._ser.addRecipe(form).subscribe(() =>

      alert("add Recipe Sucssfully")
    )
  }

  CategoryName:any

  GetCategoryName() {
    this._ser.getCategorieRecipe().subscribe((data) => {
      this.CategoryName = data
    })
  }



}
