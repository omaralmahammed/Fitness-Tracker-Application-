import { Component } from '@angular/core';
import { UrlService } from '../URL-Service/url.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css'
})
export class AddProductsComponent {

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




  //filterProductsByCategory(categoryId: string) {
  //  if (categoryId) {
  //    this.productService.GetProductsByCategory(categoryId).subscribe((products) => {
  //      this.allProductsArray = products;
  //    });
  //  } else {



  //    this.productService.GetAllProducts().subscribe((products) => {
  //      this.allProductsArray = products;
  //    });
  //  }
  //}





}


