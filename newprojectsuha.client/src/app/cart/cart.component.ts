import { Component } from '@angular/core';
import { UrlService } from '../URL-Service/url.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  //userId: any = 1
  userId: any

  ngOnInit() {
    debugger
    this._ser.UserIdObserve.subscribe((data) => {
      this.userId = data
    })

    if (this.userId != "") {
      this.CartItems(this.userId)
      this.CartItemsTotal(this.userId)
    }
    else {

      this.getBSCartItems()

      this.BSCArtTotal(this.BSCartItemsList)
    }
  }

  constructor(private _ser: UrlService, private _route: Router) { }

  cartItemsList: any[] = []
  BSCartItemsList: any[] = []

  cartTotal: number = 0
  shipping: number = 5
  cartTotalFinal: number = 0


  /// logged IN user methods
  CartItems(id: number) {
    debugger
    this._ser.getCartItems(id).subscribe((data) => {
      this.cartItemsList = data.map((item: any) => {
        return {
          ...item,
          total: item.cp.price * item.quantity
        };
      });
    });
  }


  CartItemsTotal(id: number) {
    this._ser.getCartTotal(id).subscribe((data) => {
      this.cartTotal = data;
      this.cartTotalFinal = this.cartTotal + this.shipping;
    });
  }


  deleteCartItem(cartItemId: number) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "Do you want to delete this item from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this._ser.deleteCartItem(cartItemId).subscribe(() => {
          //alert("cart item was deleted"),
            this.CartItems(this.userId),
            this.CartItemsTotal(this.userId)
        })

        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "the item has been removed from your cart",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your item is safe :)",
          icon: "error"
        });
      }
    });
    
  }


  changeCartItemQuantity(cartItemId: number, quantity: number) {
    //debugger
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





  //// logged OUT user methods

  itemTotal: any

  getBSCartItems() {
    debugger

    this._ser.BSCArtListObs.subscribe((BSdata) => {

      this.BSCartItemsList = BSdata.map((item: any) => {
        return {
          ...item,
          itemTotal: item.price * item.quantity
        };
      });
      console.log(BSdata)

    })
    console.log(this.BSCartItemsList)
  }

  BSCArtTotal(a: any) {
    //debugger
    const total = this._ser.BSCArtTotal(a);
    this.cartTotal = total;
    this.cartTotalFinal = total + this.shipping;
  }

  removeItem(productId: number) {
    //debugger

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "Do you want to delete this item from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this._ser.BSCartItemDelete(productId);

        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "the item has been removed from your cart",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your item is safe :)",
          icon: "error"
        });
      }
    });



  }

  changeBSCartItemQuantity(productId: number, quantity: number) {
    this._ser.BSCartItemQuantity(productId, quantity)
    this.BSCArtTotal(this.BSCartItemsList)
  }





  /// go to checkout
  goToCheckout() {

    if (this.userId == "") {
      localStorage.setItem("cartPage", "cart")

      this._route.navigate(["/LogIn"])
    }
    else {
      this._route.navigate(["/checkout"])
    }

  }

}
