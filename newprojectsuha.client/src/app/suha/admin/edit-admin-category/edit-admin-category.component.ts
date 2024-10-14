import { Component } from '@angular/core';
import { UrlService } from '../../../URL-Service/url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-admin-category',
  templateUrl: './edit-admin-category.component.html',
  styleUrl: './edit-admin-category.component.css'
})
export class EditAdminCategoryComponent {

  parameter: any;
  ngOnInit() {
    this.parameter = this._active.snapshot.paramMap.get('id');
  }
 
  constructor(private _ser: UrlService, private _active: ActivatedRoute) { }

  editCategory(data: any) {
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
    }
    this._ser.putAdminCategory(this.parameter, form).subscribe((data) => {
      alert("Update Category Successfully")
    })
  }
}
