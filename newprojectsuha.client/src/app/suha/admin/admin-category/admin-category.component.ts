import { Component } from '@angular/core';
import { UrlService } from '../../../URL-Service/url.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.css'
})
export class AdminCategoryComponent {

  // Array to store categories
  getCategoryArray: any;

  // Initialize component and get categories
  ngOnInit() {
    this.getCategory();
  }

  constructor(private service: UrlService, private router: Router) { }

  // Add a new category and refresh the category list immediately
  addNewCategory(data: any) {
    debugger
    var form = new FormData();

    // Add new data to the form
    for (let key in data) {
      form.append(key, data[key])
    }

    // Add a predefined "Sweaters" category to the form
    form.append('categoryName', 'Sweaters');

    // Call the service to add the category
    this.service.AddAdminCategory(form).subscribe(() => {
      Swal.fire('Success', 'Category added successfully!', 'success');

      // Refresh the category list immediately after adding
      this.getCategory();
    }, (error) => {
      console.error('Error adding category:', error);
      Swal.fire('Error', 'Failed to add category. Please try again.', 'error');
    });
  }

  // Fetch categories and update the view
  getCategory() {
    this.service.getAdminCategory().subscribe((data) => {
      this.getCategoryArray = data;
      console.log(this.getCategoryArray, "this.getCategoryArray");
    });
  }

  // Edit category
  editCategory(id: number): void {
    this.router.navigate(['/dash/EditCategory', id]);
  }

  // Delete category with confirmation
  deleteCategory(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.DeleteCategory(id).subscribe({
          next: () => {
            this.getCategory(); // Refresh the list after deletion
            Swal.fire('Deleted!', 'The category has been deleted.', 'success');
          },
          error: (error) => {
            console.error('Error deleting category:', error);
            Swal.fire('Error', 'Failed to delete category. Please try again.', 'error');
          }
        });
      }
    });
  }
}
