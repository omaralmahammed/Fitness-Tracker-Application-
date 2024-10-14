import { Component } from '@angular/core';
import { UrlService } from '../../URL-Service/url.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  // This is your form model
  contactForm = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  constructor(private _ser: UrlService, private _router: Router) { }

  ngOnInit() { }

  // This will submit the form data
  submitContactForm(data: any) {
    const form = new FormData();

    // Append form fields dynamically to FormData
    for (let key in data) {
      form.append(key, data[key])
    }

    this._ser.submitContact(form).subscribe(() => {
      Swal.fire({
        title: "Thank you!",
        text: "Your message has been successfully sent! We will get back to you soon!",
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(() => {
        this._router.navigate(['/']);
      }, 1000);
    },
      (error) => {
        alert(error.error)
      })
  }
}

