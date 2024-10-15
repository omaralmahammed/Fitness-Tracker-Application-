import { Component } from '@angular/core';
import { UrlService } from '../URL-Service/url.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  allProductsArray: any[] = [];
  allCategoriesArray: any[] = [];
  filteredProductsArray: any[] = [];
  selectedCategory: string = '';
  searchTerm: string = '';
  userId: any;
  noResultsFound: boolean = false; // Variable to track if no products were found

  constructor(private productService: UrlService) { }

  ngOnInit() {
    this.productService.UserIdObserve.subscribe((data) => {
      this.userId = data;
    });

    this.productService.GetAllCategories().subscribe((categories) => {
      this.allCategoriesArray = categories;
    });

    this.productService.GetAllProducts().subscribe((products) => {
      this.allProductsArray = products;
      this.filteredProductsArray = products; // Initialize with all products
    });
  }

  onFilterChanged(categoryId: string) {
    this.selectedCategory = categoryId;
    this.filterProducts(); // Update filtered products based on category selection
  }

  filterProducts() {
    let filteredProducts = [...this.allProductsArray]; // Start with all products

    // Filter by category if a specific category is selected
    if (this.selectedCategory) {
      filteredProducts = filteredProducts.filter(product => product.categoryId === this.selectedCategory);
    }

    // Filter by search term if one has been entered
    if (this.searchTerm.trim()) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    this.filteredProductsArray = filteredProducts; // Update displayed products

    // Update no results found state
    this.noResultsFound = this.filteredProductsArray.length === 0; // Check if results are empty
  }

  onSearchChange(searchTerm: string) {
    this.searchTerm = searchTerm.trim();
    this.filterProducts(); // Call filter method to update displayed products
  }

  addToCart(productId: number, quantity: number) {
    const cartItem = { productId, quantity };

    if (this.userId) {
      this.productService.addCartItem(this.userId, cartItem).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: 'Added!',
            text: 'The product has been successfully added to the cart.',
            confirmButtonText: 'OK'
          });
        },
        error => {
          console.error('Error adding item to cart:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Failed to add the product to the cart.',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      this.productService.getProductInfoForCart(productId).subscribe((info) => {
        const BScartItem = {
          productId: info.id,
          quantity,
          name: info.name,
          image: info.image,
          price: info.price
        };
        this.productService.BSAddToCart(BScartItem);
        Swal.fire({
          icon: 'success',
          title: 'Added!',
          text: 'The product has been successfully added to the cart.',
          confirmButtonText: 'OK'
        });
      });
    }
  }
}
