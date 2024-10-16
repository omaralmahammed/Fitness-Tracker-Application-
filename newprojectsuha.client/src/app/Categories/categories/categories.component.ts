import { Component, OnInit } from '@angular/core'; // Import OnInit for lifecycle hooks
import { UrlService } from '../../URL-Service/url.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: any[] = []; // Ensure this is declared

  constructor(private service: UrlService, private router: Router) { }

  ngOnInit() {
    this.GetAllCategories(); // Call to fetch categories on initialization
  }

  GetAllCategories() {
    this.service.GetAllCategories().subscribe((categories) => {
      this.categories = categories; // Ensure you assign to this.categories
    });
  }

  editCategory(id: number): void {
    this.router.navigate(['/dash/EditCategory', id]);
  }

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
            this.GetAllCategories(); // Refresh the list after deletion
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

  createNewCategory(): void {
    this.router.navigate(['/dash/AddCategory']); // Navigate to Add Category
  }



  addNewCategory(data: any) {
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
    }
    this.service.AddAdminCategory(form).subscribe(() => {
      alert("Category added!")
    })

  }
}
