import { Component, OnInit } from '@angular/core';
import { UrlService } from '../URL-Service/url.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css'] // Corrected to styleUrls
})
export class AllProductsComponent implements OnInit {

  allProductsArray: any[] = [];

  constructor(private productService: UrlService) { }

  ngOnInit() {
    this.GetAllProducts();
  }

  GetAllProducts() {
    this.productService.GetAllProducts().subscribe((products) => {
      this.allProductsArray = products;
    });
  }
}
