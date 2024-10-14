import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../../../URL-Service/url.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-display-class-subscriptions',
  templateUrl: './display-class-subscriptions.component.html',
  styleUrls: ['./display-class-subscriptions.component.css']
})
export class DisplayClassSubscriptionsComponent implements OnInit {
  classId: number;
  subscriptions: any[] = [];
  className: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private urlService: UrlService
  ) {
    this.classId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadSubscriptions();
  }

  loadSubscriptions(): void {
    this.urlService.GetSubscriptionsByClassId(this.classId).subscribe({
      next: (data) => {
        this.subscriptions = data;
        if (this.subscriptions.length > 0) {
          this.className = this.subscriptions[0].className;
        }
      },
      error: (error) => {
        console.error('Error fetching subscriptions:', error);
        Swal.fire('Error', 'Failed to load subscriptions. Please try again.', 'error');
      }
    });
  }

  editSubscription(id: number): void {
    this.router.navigate(['/dash/update-class-subscription', id]);
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
    this.router.navigate(['/dash/create-class-subscription', this.classId]);
  }
}
