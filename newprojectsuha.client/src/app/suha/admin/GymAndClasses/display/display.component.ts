import { Component, OnInit } from '@angular/core';
import { UrlService } from '../../../../URL-Service/url.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  gymAndClassItems: any[] = [];
  errorMessage: string = '';

  constructor(private urlService: UrlService, private router: Router) { }

  ngOnInit(): void {
    this.loadGymAndClassItems();
  }

  loadGymAndClassItems(): void {
    this.urlService.GetClassAndGyms().subscribe({
      next: (data) => {
        this.gymAndClassItems = data;
      },
      error: (error) => {
        console.error('Error fetching gym and class items:', error);
        this.errorMessage = 'Failed to load gym and class items. Please try again later.';
      }
    });
  }

  editItem(id: number): void {
    this.router.navigate(['/dash/update-gym-class', id]);
  }

  deleteItem(id: number): void {
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
        this.urlService.DeleteClassAndGym(id).subscribe({
          next: () => {
            this.loadGymAndClassItems();
            Swal.fire('Deleted!', 'The item has been deleted.', 'success');
          },
          error: (error) => {
            console.error('Error deleting item:', error);
            Swal.fire('Error', 'Failed to delete item. Please try again.', 'error');
          }
        });
      }
    });
  }


  createNewItem(): void {
    this.router.navigate(['/dash/create-gym-class']);
  }

  viewSubscriptions(id: number): void {
    this.router.navigate(['/dash/display-class-subscription', id]);
  }
}
