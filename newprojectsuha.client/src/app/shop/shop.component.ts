import { Component } from '@angular/core';
import { UrlService } from '../URL-Service/url.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  allProductsArray: any[] = []; // لتخزين جميع المنتجات
  allCategoriesArray: any[] = []; // لتخزين جميع الفئات
  selectedCategory: string = ''; // الفئة المحددة

  constructor(private productService: UrlService) { }

  ngOnInit() {
    // جلب الفئات
    this.productService.GetAllCategories().subscribe((categories) => {
      this.allCategoriesArray = categories;
    });

    // جلب جميع المنتجات بشكل افتراضي
    this.productService.GetAllProducts().subscribe((products) => {
      this.allProductsArray = products;
    });
  }

  // تغيير الفئة المحددة عند اختيار فئة جديدة
  onFilterChanged(categoryId: string) {
    this.selectedCategory = categoryId;
    this.filterProductsByCategory(categoryId);
  }

  // تصفية المنتجات بناءً على الفئة المحددة
  filterProductsByCategory(categoryId: string) {
    if (categoryId) {
      this.productService.GetProductsByCategory(categoryId).subscribe((products) => {
        this.allProductsArray = products;
      });
    } else {
      // إذا لم يتم اختيار فئة، اعرض جميع المنتجات
      this.productService.GetAllProducts().subscribe((products) => {
        this.allProductsArray = products;
      });
    }
  }
}
