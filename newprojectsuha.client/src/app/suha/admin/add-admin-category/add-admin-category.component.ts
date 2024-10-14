import { Component } from '@angular/core';
import { UrlService } from '../../../URL-Service/url.service';

@Component({
  selector: 'app-add-admin-category',
  templateUrl: './add-admin-category.component.html',
  styleUrl: './add-admin-category.component.css'
})
export class AddAdminCategoryComponent {

  ngOnInit() { }

  constructor(private _ser: UrlService) { }

  

  addNewCategory(data: any) {
    debugger
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
    }
    this._ser.AddAdminCategory(form).subscribe(() => {
      alert("Category added!")
    })

  }
}
