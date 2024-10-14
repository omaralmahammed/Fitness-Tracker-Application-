import { Component } from '@angular/core';
import { UrlService } from '../../../../URL-Service/url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrl: './update-products.component.css'
})
export class UpdateProductsComponent {
  parameter: any;
  ngOnInit() {
    this.parameter = this._active.snapshot.paramMap.get('id');
  }
  image: any
  changeImage(event: any) {
    this.image = event.target.files[0];
  }
  constructor(private _ser: UrlService, private _active: ActivatedRoute) { }

  editProdect(data: any) {
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
    }
    form.append("Image", this.image)
    this._ser.PUTProddect(this.parameter, form).subscribe((data) => {
      alert("ok")
    })
  }
}
