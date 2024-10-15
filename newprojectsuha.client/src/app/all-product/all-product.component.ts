import { Component, OnInit } from '@angular/core';
import { UrlService } from '../URL-Service/url.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css'] // Corrected to styleUrls
})
export class AllProductsComponent implements OnInit {

  allProductsArray: any[] = [];

  constructor(private productService: UrlService, private router: Router) { }

  ngOnInit() {
    this.GetAllProducts();
  }

  GetAllProducts() {
    this.productService.GetAllProducts().subscribe((products) => {
      this.allProductsArray = products;
    });
  }

  // Navigate to edit product
  editProduct(id: number): void {
    this.router.navigate(['/dash/EditProduct', id]); // Navigate to the edit route for the product
  }

  // Delete product
  deleteProduct(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.DeleteProduct(id).subscribe({ // Call the delete method from the service
          next: () => {
            this.GetAllProducts(); // Refresh the product list after deletion
            Swal.fire('Deleted!', 'The product has been deleted.', 'success');
          },
          error: (error) => {
            console.error('Error deleting product:', error);
            Swal.fire('Error', 'Failed to delete product. Please try again.', 'error');
          }
        });
      }
    });
  }

  // Navigate to create new product
  createNewProduct(): void {
    this.router.navigate(['/dash/addprodect']); // Navigate to Add Product
  }
}
