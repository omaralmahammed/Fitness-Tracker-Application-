import { Component } from '@angular/core';
import { UrlService } from '../URL-Service/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(private _ser: UrlService, private _route: Router) { }

  email: any;
  UserId: any;

  
  ngOnInit() {
    this._ser.emailaddress.subscribe((email) => {
      this.email = email;
    });

    this._ser.UserIdObserve.subscribe((UserId) => {
      this.UserId = UserId;
    });

  }


  logout() {
    this.email = "";
    this.UserId = "";
    this._route.navigate(['/'])
  }

}
