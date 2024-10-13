import { Component } from '@angular/core';
import { UrlService } from '../URL-Service/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  //userId: any = 1
  userId: any 

  ngOnInit() {
    this._ser.UserIdObserve.subscribe((data) => {
      this.userId = data
    })

    if (this.userId != "") {
      this.CartItems(this.userId)
      this.CartItemsTotal(this.userId)
    }
    else {

    }


  }

  constructor(private _ser: UrlService, private _route: Router) { }

  cartItemsList: any

  CartItems(id: number) {
    this._ser.getCartItems(id).subscribe((data) => {
      this.cartItemsList = data.map((item: any) => {
        return {
          ...item,
          total: item.cp.price * item.quantity
        };
      });
    });
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


  deleteCartItem(cartItemId: number) {
    this._ser.deleteCartItem(cartItemId).subscribe(() => {
      alert("cart item was deleted"),
        this.CartItems(this.userId),
        this.CartItemsTotal(this.userId)
    })
  }


  changeCartItemQuantity(cartItemId: number, quantity: number) {
    debugger
    this._ser.changeCartItemQuantity(cartItemId, quantity).subscribe(() => {

      if (quantity <= 0) {
        alert("quantity can't be 0 or lower. please delete the item if you don't want it")
      }

      const item = this.cartItemsList.find((i: any) => i.id === cartItemId);

      if (item) {
        item.quantity = quantity; // update quantity
        item.total = item.cp.price * quantity; // update total
      }

      this.CartItems(this.userId),
        this.CartItemsTotal(this.userId)
    })
  }


  goToCheckout() {

  }





}
