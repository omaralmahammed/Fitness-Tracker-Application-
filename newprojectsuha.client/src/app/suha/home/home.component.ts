import { Component } from '@angular/core';
import { UrlService } from '../../URL-Service/url.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 

  constructor(private _ser: UrlService) { }

  ngOnInit() {
    this.getTestimonial();
  }

  testimonialArray: any[] = [];
  getTestimonial() {
    debugger;
    this._ser.getTestimonials().subscribe((data) => {
      this.testimonialArray = data
      console.log(this.testimonialArray, "this.testimonialArray")
    })

  
  }

}
