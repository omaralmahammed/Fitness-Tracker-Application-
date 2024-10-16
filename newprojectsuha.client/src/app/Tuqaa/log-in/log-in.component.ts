import { Component } from '@angular/core';
import { UrlService } from '../../URL-Service/url.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  ngOnInit() {

    this.getBSCartItems()

  }
  constructor(private _ser: UrlService, private _router: Router) { }

  BSCartItemsList: any

  loginNewUser(data: any) {

    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
    }

    this._ser.loginUser(form).subscribe((newData) => {

      this._ser['email'].next(newData.email);
      this._ser['UserId'].next(newData.id);

      var checkClassPayment = localStorage.getItem("ClassId")
      var fromCart = localStorage.getItem("cartPage")

      

      if (checkClassPayment != null) {

        this._router.navigate([`/subscriptions/${checkClassPayment}`]);
        localStorage.removeItem("ClassId");

      } else if (fromCart && newData.email != 'admin@gmail.com') {
        //debugger

        this.moveFromBStoDB(newData.id, this.BSCartItemsList)

        this._router.navigate([`/shop`]);
        this._router.navigate([`/cart`]);
        localStorage.removeItem("cartPage");

      }
      else if (newData.email == 'admin@gmail.com') {

        this._router.navigate(['/dash']);

      } else {

        this.moveFromBStoDB(newData.id, this.BSCartItemsList)

        Swal.fire({
          icon: "success",
          title: "Welcome You!",
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          setTimeout(() => {
            this._router.navigate(['/']);
          }, 1000);
        });
      }

    })
  }


  moveFromBStoDB(userId: number, BSList: any) {
    this._ser.moveFromBStoDB(userId, BSList).subscribe(() => {
      //alert("items moved siccessfully")
    })
  }

  getBSCartItems() {
    this._ser.BSCArtListObs.subscribe((BSdata) => {
      this.BSCartItemsList = BSdata
    })
  }






}
