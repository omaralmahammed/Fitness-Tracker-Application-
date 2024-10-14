import { Component } from '@angular/core';
import { UrlService } from '../URL-Service/url.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  //userId: any = 1
  userId: any 

  ngOnInit() {

    this._ser.UserIdObserve.subscribe((data) => {
      this.userId = data
    })

    this.getUserInfoForOrder(this.userId)

    this.getCartDetailsForCheckout(this.userId)

    this.CartItemsTotal(this.userId)

    
  }

  constructor(private _ser: UrlService, private _route: Router, private url: UrlService) { }

  moveFromCartToOrder(userId: number) {
    this._ser.moveFromCartToOrder(userId).subscribe(() => {
      alert("moved successfully")
    })
  }

  userInfoArray :any

  getUserInfoForOrder(userId: number) {
    //debugger
    this._ser.getUserInfoForOrder(userId).subscribe((data) => {
      //console.log(data)
      this.userInfoArray = data
    })
  }

  cartInfoArray :any

  getCartDetailsForCheckout(userId: number) {
    this._ser.getCartDetailsForCheckout(userId).subscribe((data) => {
      console.log(data)
      /*this.cartInfoArray = data*/
      this.cartInfoArray = data.map((item: any) => {
        return {
          ...item,
          total: item.p.price * item.quantity
        };
      });
    })
  }


  cartTotal: number = 0
  shipping: number = 5
  cartTotalFinal: number = 0

  CartItemsTotal(id: number) {
    this._ser.getCartTotal(id).subscribe((data) => {
      this.cartTotal = data;
      this.cartTotalFinal = this.cartTotal + this.shipping;
    });
  }




  /////////////////////////////////////////////////////////////////////////////////////////

  

  FinalCheckOut() {
    


    this.url.UserIdObserve.subscribe(() => {
      debugger

      this._ser.CartCheckOut(this.userId).subscribe((data) => {

          const width = 600;
          const height = 700;
          const left = (screen.width / 2) - (width / 2);
          const top = (screen.height / 2) - (height / 2);


          const popupWindow = window.open(
            data.approvalUrl,
            'PayPal Payment',
            `width=${width},height=${height},top=${top},scrollbars=yes,resizable=yes`
          );

          const checkWindowClosed = setInterval(() => {
            if (popupWindow && popupWindow.closed) {
              clearInterval(checkWindowClosed);

              Swal.fire({
                icon: "success",
                title: "Payment Successfully!",
                showConfirmButton: false,
                timer: 2000
              }).then(() => {
                setTimeout(() => {
                  this._route.navigate(['/orderhistory']);
                }, 1000);
              });


            }
          }, 500);

        },
          (error) => {
            Swal.fire({
              icon: "warning",
              title: `${error.error}`,
              showConfirmButton: false,
              timer: 2000
            });
          });
      
    });
  }


}
