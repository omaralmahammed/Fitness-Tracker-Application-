import { Component, OnInit } from '@angular/core';
import { UrlService } from '../../../../URL-Service/url.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-display-subscription',
  templateUrl: './display-subscription.component.html',
  styleUrls: ['./display-subscription.component.css']
})
export class DisplaySubscriptionComponent implements OnInit {

  subscriptions: any[] = [];
  errorMessage: string = '';

  constructor(private urlService: UrlService, private router: Router) { }

  ngOnInit(): void {
    this.loadSubscriptions();
  }

  loadSubscriptions(): void {
    this.urlService.GetAllSubscriptions().subscribe({
      next: (data) => {
        this.subscriptions = data;
      },
      error: (error) => {
        console.error('Error fetching subscriptions:', error);
        this.errorMessage = 'Failed to load subscriptions. Please try again later.';
      }
    });
  }

  editSubscription(id: number): void {
    this.router.navigate(['/dash/Update-Subscription', id]);
  }

  deleteSubscription(id: number): void {
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
        this.urlService.DeleteSubscription(id).subscribe({
          next: () => {
            this.loadSubscriptions();
            Swal.fire('Deleted!', 'The subscription has been deleted.', 'success');
          },
          error: (error) => {
            console.error('Error deleting subscription:', error);
            Swal.fire('Error', 'Failed to delete subscription. Please try again.', 'error');
          }
        });
      }
    });
  }

  createNewSubscription(): void {
    this.router.navigate(['/dash/Create-Subscription']);
  }
}
