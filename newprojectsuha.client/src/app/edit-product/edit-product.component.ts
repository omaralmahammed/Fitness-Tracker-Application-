import { Component } from '@angular/core';
import { UrlService } from '../URL-Service/url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {

  parameter: any;
  image: any;
  categories: any[] = [];  // Array to hold categories


  constructor(private _ser: UrlService, private _active: ActivatedRoute) { }

  ngOnInit() {
    // Get the product ID from the route parameters
    this.parameter = this._active.snapshot.paramMap.get('id');
    this.getAllCategories();

  }

  // Method to handle image change event
  // Method to handle image change event
  changeImage(event: any) {
    this.image = event.target.files[0]; // Capture the selected image file
    console.log(this.image); // Debugging to ensure the file is captured correctly
  }


  // Method to handle product edit form submission
  editProduct(data: any) {
    const form = new FormData();

    // Append each form field to the FormData object
    for (let key in data) {
      form.append(key, data[key]);
    }

    // Append the product image to FormData
    form.append("ProductImage", this.image);

    // Call the service method to update the product (PUT request)
    this._ser.UpdateProduct(this.parameter, form).subscribe((response) => {
      alert("Product updated successfully");
    }, (error) => {
      console.error('Error updating product:', error);
    });
  }
  // Method to fetch all categories
  getAllCategories() {
    this._ser.GetAllCategories().subscribe(
      (data: any[]) => {
        this.categories = data;  // Assign the fetched categories to the array
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
}
