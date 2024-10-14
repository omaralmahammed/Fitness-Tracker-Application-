import { Component } from '@angular/core';
import { UrlService } from '../../../../URL-Service/url.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-subscription',
  templateUrl: './create-subscription.component.html',
  styleUrls: ['./create-subscription.component.css']
})
export class CreateSubscriptionComponent {
  newSubscription: any = {
    duration: '',
    finalPrice: null,
    classId: null
  };

  constructor(private urlService: UrlService, private router: Router) { }

  createSubscription(): void {
    this.urlService.CreateSubscription(this.newSubscription).subscribe({
      next: (response) => {
        console.log('Subscription created successfully:', response);
        Swal.fire('Success', 'Subscription created successfully', 'success');
        this.router.navigate(['/dash/display-subscriptions']);
      },
      error: (error) => {
        console.error('Error creating subscription:', error);
        Swal.fire('Error', 'Failed to create subscription. Please try again.', 'error');
      }
    });
  }
}
