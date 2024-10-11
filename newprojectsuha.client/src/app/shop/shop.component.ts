import { Component } from '@angular/core';
import { UrlService } from '../URL-Service/url.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  allProductsArray: any[] = []; 
  allCategoriesArray: any[] = []; 
  selectedCategory: string = ''; 

  constructor(private productService: UrlService) { }

  ngOnInit() {
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
}
