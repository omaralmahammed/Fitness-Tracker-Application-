import { Component } from '@angular/core';
import { UrlService } from '../URL-Service/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  userId: any = 1
  //userId: any 

  ngOnInit() {

    //this._ser.UserIdObserve.subscribe((data) => {
    //  this.userId = data
    //})


  }

  constructor(private _ser: UrlService, private _route: Router) { }

  moveFromCartToOrder(userId: number) {
    this._ser.moveFromCartToOrder(userId).subscribe(() => {
      alert("moved successfully")
    })
  }









}
