import { Component } from '@angular/core';
import { UrlService } from '../../../URL-Service/url.service';

@Component({
  selector: 'app-get-all-users',
  templateUrl: './get-all-users.component.html',
  styleUrl: './get-all-users.component.css'
})
export class GetAllUSERSComponent {

  ngOnInit() {

    this.GetAllUSERS();
  }
  constructor(private _ser: UrlService) {


  }


  allusers: any

  GetAllUSERS() {
    debugger
    this._ser.GetAllusers().subscribe((data) => {
      this.allusers = data
      console.log(this.allusers, "this.servicesArray")
    })

  }
}
