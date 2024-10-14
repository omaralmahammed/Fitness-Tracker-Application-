import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { UrlService } from '../URL-Service/url.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  categories: any[] = [];
  image: any;

  constructor(private _ser: UrlService, private _router: Router) { }

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    this._ser.GetAllCategories().subscribe(
      (data: any[]) => {
        this.categories = data; // Assuming `data` is an array of categories
      },
      (error) => {
        alert('Error fetching categories');
      }
    );
  }

  changeImage(event: any) {
    this.image = event.target.files[0];
  }

  addnewProduct(data: any) {
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }
    form.append('Image', this.image); // Append the image file

    this._ser.AddProduct(form).subscribe(
      () => {
        alert('The product was added successfully');
        this._router.navigate(['AdminDashBoard/GetProducts']);
      },
      (error) => {
        alert(error.error);
      }
    );
  }
} 
