import { Component, OnInit } from '@angular/core';
import { UrlService } from '../../../../URL-Service/url.service';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css']
})
export class DisplayProductsComponent implements OnInit {
  products: any[] = [];
  errorMessage: string = '';

  constructor(private urlService: UrlService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.urlService.GetAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.errorMessage = 'Failed to load products. Please try again later.';
      }
    });
  }


  deleteProdect11(id: any) {
    this.urlService.deletProdects(id).subscribe(() => {
      alert("delete Prodect successfully")
      this.loadProducts()
    })
  }

}
