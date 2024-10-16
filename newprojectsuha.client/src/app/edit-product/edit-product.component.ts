import { Component } from '@angular/core';
import { UrlService } from '../URL-Service/url.service';
import { ActivatedRoute, Router } from '@angular/router';  // <-- Import Router
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']  // <-- Ensure this is 'styleUrls' for array
})
export class EditProductComponent {

  parameter: any;
  image: any;
  categories: any[] = [];  // Array to hold categories
  product: any = {}; // Object to hold the product data

  constructor(private _ser: UrlService, private _active: ActivatedRoute, private router: Router) { }  // <-- Inject Router

  ngOnInit() {
    // Get the product ID from the route parameters
    this.parameter = this._active.snapshot.paramMap.get('id');
    this.getAllCategories();
    this.getProductById(this.parameter);
  }

  // Method to fetch product details by ID
  getProductById(id: number) {
    this._ser.GetProductById(id).subscribe(
      (data: any) => {
        this.product = data;  // Assign fetched product data to 'product'
        console.log('Fetched product:', this.product);
      },
      (error) => {
        console.error('Error fetching product:', error);
      }
    );
  }

  // Method to handle image change event
  changeImage(event: any) {
    this.image = event.target.files[0];
  }

  // Method to handle product edit form submission
  editProduct(data: any) {
    const form = new FormData();

    // Append each form field to the FormData object
    for (let key in data) {
      form.append(key, data[key]);
    }

    // Append the product image to FormData
    form.append("Image", this.image);

    // Call the UpdateProduct service method
    this._ser.UpdateProduct(this.parameter, form).subscribe(
      (response) => {
        Swal.fire('Updated!', 'Product has been updated.', 'success').then(() => {
          // Navigate back to the categories list
          this.router.navigate(['/dash/AllProduct']);
        });

        // Navigate to the All Products dashboard after successful edit
        this.router.navigate(['/dash/AllProduct']);  // <-- Navigate to All Products
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
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
