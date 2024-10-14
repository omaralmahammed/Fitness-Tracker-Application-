import { Component } from '@angular/core';
import { UrlService } from '../../URL-Service/url.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  Array: any[] = [];

  constructor(private Service: UrlService) { }

  ngOnInit() {
    this.GetAllCategories();
  }

  GetAllCategories() {
    this.Service.GetAllCategories().subscribe((products) => {
      this.Array = products;
    });
  }
}
