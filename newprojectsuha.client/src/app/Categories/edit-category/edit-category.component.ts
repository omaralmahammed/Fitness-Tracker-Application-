import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../URL-Service/url.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent {
  categoryId: any| null = null; // Initialize categoryId
  categoryData: any = {}; // Placeholder for the category data

  constructor(private route: ActivatedRoute, private router: Router, private service: UrlService) { }

  ngOnInit(): void {
    // Fetch the category ID from the route
    this.categoryId = this.route.snapshot.paramMap.get('id');

    // Fetch category details using the ID
    if (this.categoryId) {
      this.fetchCategory(this.categoryId);
    }
  }

  fetchCategory(id: any): void {
    this.service.GetCategoryById(id).subscribe(
      data => {
        this.categoryData = data; // Populate the form with the fetched category data
      },
      error => {
        console.error('Error fetching category:', error);
        // Handle error, e.g., show a notification
      }
    );
  }

  editCategory(formValues: any): void {
    if (this.categoryId) {
      // Call the service to update the category
      this.service.UpdateCategory(this.categoryId, formValues).subscribe(
        response => {
          console.log('Category updated successfully:', response);
          // Navigate back or show success message
          this.router.navigate(['/dash/Categories']);
        },
        error => {
          console.error('Error updating category:', error);
          // Handle error, e.g., show a notification
        }
      );
    }
  }

}
