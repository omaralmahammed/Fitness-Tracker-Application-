import { Component } from '@angular/core';
import { UrlService } from '../URL-Service/url.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(private _ser: UrlService) { }

  email: any;
  UserId: any;

  ngOnInit() {
    this._ser.emailaddress.subscribe(([email, UserId]) => {
      this.email = email;
      this.UserId = UserId;
    });
  }

}
