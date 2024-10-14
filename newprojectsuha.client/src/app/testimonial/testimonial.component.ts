import { Component } from '@angular/core';
import { UrlService } from '../URL-Service/url.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.css'
})
export class TestimonialComponent {

  userId: any; 
  constructor(private _ser: UrlService, private _router: Router) { }

  ngOnInit() {

    this._ser.UserId.subscribe((data) => {
      this.userId = data;
    });
  }


  submitTestimonial(data: any) {
    var formdata = new FormData();

    for (let item in data) {
      formdata.append(item, data[item]);
    }

   formdata.append('UserId', this.userId);

    // Call the service to send the FormData
    this._ser.addTestimonial(formdata).subscribe(() => {

      Swal.fire({
        icon:'success',
        title: "Thank you!",
        showConfirmButton: false,
        timer: 2000
      });


      setTimeout(() => {
        this._router.navigate(['/']);
      }, 2000); 
    });
  }

}
