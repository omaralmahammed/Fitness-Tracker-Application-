import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlService } from '../URL-Service/url.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent {

  productId: any | null = null;
  product: any; // Define your product type
  relatedProducts: any[] = []; // Array to hold related products
  quantity: number = 1; // Default quantity

  constructor(private route: ActivatedRoute, private productService: UrlService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if (this.productId) {
        this.productService.GetProductById(this.productId).subscribe(product => {
          this.product = product;
          // Now fetch the last 3 products from the same category
          this.loadRelatedProducts(product.categoryId);
        });
      }
    });
  }
  
  loadRelatedProducts(categoryId: any) {
    this.productService.GetLast3ProductsByCategory(categoryId).subscribe(
      products => {
        this.relatedProducts = products; // Assign the fetched products
      },
      error => {
        console.error("Error fetching related products:", error);
      }
    );
  }

  addToCart(productId: number, quantity: number) {
    const userId = 1; // Replace with the actual user ID or get it dynamically
    const cartItem = {
      productId: productId,
      quantity: quantity
    };

    this.productService.addCartItem(userId, cartItem).subscribe(response => {
      console.log('Item added to cart:', response);

      // Show SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: 'The product has been successfully added to the cart.',
        confirmButtonText: 'OK'
      });

    }, error => {
      console.error('Error adding item to cart:', error);

      // Show error message if the operation fails
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Failed to add the product to the cart.',
        confirmButtonText: 'OK'
      });
    });
  }

}


