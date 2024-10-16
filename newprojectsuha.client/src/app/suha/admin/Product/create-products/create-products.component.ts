import { Component } from '@angular/core';
import { UrlService } from '../../../../URL-Service/url.service';

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrl: './create-products.component.css'
})
export class CreateProductsComponent {

  ngOnInit() {
    this.GetCategoryName()
  }

  constructor(private _ser: UrlService) { }

  image: any
  changeImage(event: any) {
    this.image = event.target.files[0]
  }

  addNewProdect(data: any) {

    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
    }

    form.append("Image", this.image)
    this._ser.addProdect(form).subscribe(() =>

      alert("add Prodect Sucssfully")
    )
  }

  CategoryName: any

  GetCategoryName() {
    this._ser.getAdminCategory().subscribe((data) => {
      this.CategoryName = data
    })
  }
}
