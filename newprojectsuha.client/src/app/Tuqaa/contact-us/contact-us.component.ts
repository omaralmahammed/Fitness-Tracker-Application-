//import { Component } from '@angular/core';
//import { UrlService } from '../../URL-Service/url.service';
//import { Router } from '@angular/router';

//@Component({
//  selector: 'app-contact-us',
//  templateUrl: './contact-us.component.html',
//  styleUrls: ['./contact-us.component.css']
//})
//export class ContactUsComponent {

//  // This is your form model
//  contactForm = {
//    name: '',
//    email: '',
//    phone: '',
//    subject: '',
//    message: ''
//  };

//  constructor(private _ser: UrlService, private _router: Router) { }

//  ngOnInit() { }

//  // This will submit the form data
//  submitContactForm() {
//    const form = new FormData();

//    // Loop over the contactForm object and append the data
//    for (let key in this.contactForm) {
//      form.append(key, this.contactForm[key]);
//    }

//    // Call the UrlService to submit the form
//    this._ser.submitContact(form).subscribe(() => {
//      alert("Contact form submitted successfully");
//      this._router.navigate(['/thank-you-page']); // Replace with your desired route
//    },
//      (error) => {
//        alert("Error submitting the contact form: " + error.error);
//      });
//  }
//}
