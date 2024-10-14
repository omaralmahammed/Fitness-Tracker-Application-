import { Component } from '@angular/core';
import { UrlService } from '../../../URL-Service/url.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-testimonial',
  templateUrl: './admin-testimonial.component.html',
  styleUrl: './admin-testimonial.component.css'
})
export class AdminTestimonialComponent {

  ngOnInit() {

    this.AdminTestimonials();

  }

  constructor(private _ser: UrlService) {


  }

  TestimonialAdminArray: any
  AdminTestimonials() {
    this._ser.AdminTestimonials().subscribe((data) => {
      this.TestimonialAdminArray = data
      console.log(this.TestimonialAdminArray, "this.TestimonialAdminArray")
    })

  }

  updateStatus(item: any, newStatus: string) {
    let confirmMessage = newStatus === 'Accepted' ? 'Accept this testimonial?' : 'Reject this testimonial?';

    Swal.fire({
      title: 'Are you sure?',
      text: confirmMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, confirm it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._ser.updateTestimonialStatus(item.id, newStatus).subscribe(
          (response) => {
            // On success, update the local status
            item.status = newStatus;
            Swal.fire('Updated!', `The testimonial has been ${newStatus.toLowerCase()}.`, 'success');
          },
          (error) => {
            Swal.fire('Error', 'There was an error updating the status.', 'error');
          }
        );
      }
    });
  }

}
