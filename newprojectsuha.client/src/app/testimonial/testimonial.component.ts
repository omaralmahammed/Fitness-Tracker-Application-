import { Component } from '@angular/core';
import { UrlService } from '../URL-Service/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.css'
})
export class TestimonialComponent {

  userId: any;  // This will store the user ID
  data = {
    userId: 0,
    content: ''
  };

  constructor(private _ser: UrlService) { }

  ngOnInit() {
    // Get the userId using an observable or some other method
    this._ser.UserId.subscribe((data) => {
      this.userId = data;
      console.log("User ID: ", this.userId); 
    });
  }

  // Function to submit the testimonial
  submitTestimonial(content: string) {
    if (!content) {
      alert('Please write a testimonial message!');
      return;  // Prevent submission if content is empty
    }
    const formData: FormData = new FormData();

    // Add form fields to FormData
    formData.append('userId', this.userId.toString());  // Convert userId to string if needed
    formData.append('content', content);

    // Call the service to send the FormData
    this._ser.addTestimonial(formData).subscribe(() => {
      alert('Testimonial submitted successfully');
    });
  }


}
