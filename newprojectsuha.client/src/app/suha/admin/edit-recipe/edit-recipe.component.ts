import { Component } from '@angular/core';
import { UrlService } from '../../../URL-Service/url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css'
})
export class EditRecipeComponent {
  parameter: any;
  ngOnInit() {
    this.parameter = this._active.snapshot.paramMap.get('id');
  }
  image: any
  changeImage(event: any) {
    this.image = event.target.files[0];
  }
  constructor(private _ser: UrlService, private _active: ActivatedRoute) { }

  editRecipe(data: any) {
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
    }
    form.append("Image", this.image)
    this._ser.PUTRecipe(this.parameter, form).subscribe((data) => {
      alert("ok")
    })
  }
}
