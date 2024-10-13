import { Component } from '@angular/core';
import { UrlService } from '../URL-Service/url.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  allProductsArray: any[] = [];
  allCategoriesArray: any[] = [];
  selectedCategory: string = '';

  userId: any

  constructor(private productService: UrlService) { }

  ngOnInit() {

    this.productService.UserIdObserve.subscribe((data) => {
      this.userId = data
    })

    this.productService.GetAllCategories().subscribe((categories) => {
      this.allCategoriesArray = categories;
    });

    this.productService.GetAllProducts().subscribe((products) => {
      this.allProductsArray = products;
    });
  }

  onFilterChanged(categoryId: string) {
    this.selectedCategory = categoryId;
    this.filterProductsByCategory(categoryId);
  }




  filterProductsByCategory(categoryId: string) {
    if (categoryId) {
      this.productService.GetProductsByCategory(categoryId).subscribe((products) => {
        this.allProductsArray = products;
      });
    } else {



      this.productService.GetAllProducts().subscribe((products) => {
        this.allProductsArray = products;
      });
    }
  }



  addToCart(productId: number, quantity: number) {

    const cartItem = {
      productId: productId,
      quantity: quantity
    };

    if (this.userId != "") {

      this.productService.addCartItem(this.userId, cartItem).subscribe(response => {
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
    else {
      this.productService.BSAddToCart({ ...cartItem })
      //console.log(cartItem)
    }


  }





}


