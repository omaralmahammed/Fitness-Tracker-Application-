import { Component } from '@angular/core';
import { UrlService } from '../../../URL-Service/url.service';

@Component({
  selector: 'app-add-tips',
  templateUrl: './add-tips.component.html',
  styleUrl: './add-tips.component.css'
})
export class AddTipsComponent {

  ngOnInit() {

  }

  constructor(private _ser: UrlService) { }

  image: any
  changeImage(event: any) {
    this.image = event.target.files[0]
  }

  addNewTips(data: any) {

    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
    }

    form.append("Image", this.image)
    this._ser.addTips(form).subscribe(() =>

      alert("add Tips Sucssfully")
    )
  }

}
