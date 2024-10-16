import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../URL-Service/url.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'] // Corrected from styleUrl to styleUrls
})
export class EditCategoryComponent implements OnInit {
  categoryId: any | null = null; // Initialize categoryId
  categoryData: any = {}; // Placeholder for the category data

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: UrlService
  ) { }

  ngOnInit(): void {
    // Fetch the category ID from the route
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
        // Optionally show an error notification
        Swal.fire('Error!', 'Unable to fetch category details.', 'error');
      }
    );
  }

  editCategory(formValues: any): void {
    if (this.categoryId) {
      // Create a FormData object to send data
      const form = new FormData();
      for (const key in formValues) {
        if (formValues.hasOwnProperty(key)) {
          form.append(key, formValues[key]);
        }
      }

      // Call the service to update the category
      this.service.UpdateCategory(this.categoryId, form).subscribe(
        response => {
          console.log('Category updated successfully:', response);
          Swal.fire('Updated!', 'Category has been updated.', 'success').then(() => {
            // Navigate back to the categories list
            this.router.navigate(['/dash/AdminCategory']);
          });
        },
        error => {
          console.error('Error updating category:', error);
          Swal.fire('Error!', 'Error updating category, please try again.', 'error');
        }
      );
    }
  }
}
