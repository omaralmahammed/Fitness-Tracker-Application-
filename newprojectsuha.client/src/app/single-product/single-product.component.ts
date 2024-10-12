import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../URL-Service/url.service';
import Swal from 'sweetalert2';
import { ViewportScroller } from '@angular/common';

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

  constructor(
    private route: ActivatedRoute,

    private productService: UrlService,
    private router: Router,  // Inject Router
    private viewportScroller: ViewportScroller  // Inject ViewportScroller
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if (this.productId) {
        this.productService.GetProductById(this.productId).subscribe(product => {
          this.product = product;
          // Now fetch the last 3 products from the same category
          this.loadRelatedProducts();
        });
      }
    });
  }
  
  // Fetch 3 random products excluding the current one
  loadRelatedProducts() {
    if (this.productId) {
      // Fetch random 3 products in the same category except the current product
      this.productService.GetRandom3ProductsByCategory(this.productId).subscribe(
        products => {
          this.relatedProducts = products; // Assign the fetched products
        },
        error => {
          console.error("Error fetching related products:", error);
        }
      );
    }
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
  // Navigate to the selected product and scroll to top
  navigateToProduct(productId: number) {
    this.router.navigate(['/SingleProduct', productId]).then(() => {
      // Scroll to the top of the page
      this.viewportScroller.scrollToPosition([500, 500]);
    });
  }


}


