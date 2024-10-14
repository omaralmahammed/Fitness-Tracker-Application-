import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../../../URL-Service/url.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-class-subscriptions',
  templateUrl: './create-class-subscriptions.component.html',
  styleUrls: ['./create-class-subscriptions.component.css']
})
export class CreateClassSubscriptionsComponent implements OnInit {
  classId: number;
  className: string = '';
  newSubscription: any = {
    duration: '',
    finalPrice: null,
    classId: null
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private urlService: UrlService
  ) {
    this.classId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.newSubscription.classId = this.classId;
    this.loadClassName();
  }

  loadClassName(): void {
    this.urlService.GetClassAndGym(this.classId).subscribe({
      next: (data) => {
        this.className = data.name;
      },
      error: (error) => {
        console.error('Error fetching class name:', error);
        Swal.fire('Error', 'Failed to load class details. Please try again.', 'error');
      }
    });
  }

  createSubscription(): void {
    this.urlService.CreateSubscription(this.newSubscription).subscribe({
      next: (response) => {
        console.log('Subscription created successfully:', response);
        Swal.fire('Success', 'Subscription created successfully', 'success');
        this.router.navigate(['/dash/display-class-subscription', this.classId]);
      },
      error: (error) => {
        console.error('Error creating subscription:', error);
        Swal.fire('Error', 'Failed to create subscription. Please try again.', 'error');
      }
    });
  }


  cancelData() {

    this.router.navigate(['/dash/display-class-subscription', this.classId])
  }
}
