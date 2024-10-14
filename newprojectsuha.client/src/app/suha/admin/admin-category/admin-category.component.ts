import { Component } from '@angular/core';
import { UrlService } from '../../../URL-Service/url.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.css'
})
export class AdminCategoryComponent {

  ngOnInit() {

    this.getCategory();
  }
  constructor(private _ser: UrlService) {


  }

  getCategoryArray: any
  getCategory() {
    this._ser.getAdminCategory().subscribe((data) => {
      this.getCategoryArray = data
      console.log(this.getCategoryArray, "this.getCategoryArray")
    })

  }

  deleteCategory(id: any) {
    this._ser.DeleteCategory(id).subscribe(() => {
      alert("delete Category successfully")
      this.getCategory()
    }

    )
  }
}
