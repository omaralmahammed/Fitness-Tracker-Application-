import { Component } from '@angular/core';
import { UrlService } from '../../URL-Service/url.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  Last3ProductArray: any[] = [];
  userId: any

  constructor(private _ser: UrlService) { }

  UserId:any

  ngOnInit() {
    this.getTestimonial();
    this._ser.UserIdObserve.subscribe((UserId) => {
      this.UserId = UserId;
    });
    this.GetLast3Products();


    this._ser.UserIdObserve.subscribe((data) => {
      this.userId = data
    })

  


  }

  testimonialArray: any[] = [];
  getTestimonial() {
    this._ser.getTestimonials().subscribe((data) => {
      this.testimonialArray = data
      console.log(this.testimonialArray, "this.testimonialArray")
    })


  }




  GetLast3Products() {
    this._ser.GetLast3Products().subscribe(
      (products) => {
        this.Last3ProductArray = products;
      },
      (error) => {
        console.error("Error fetching products", error);
      }
    );
  }



  addToCart(productId: number, quantity: number) {

    const cartItem = {
      productId: productId,
      quantity: quantity
    };

    const BScartItem = {
      productId: productId,
      quantity: quantity,
      name: "",
      image: "",
      price: 0,
    };

    if (this.userId != "") {


      this._ser.addCartItem(this.userId, cartItem).subscribe(response => {
        console.log('Item added to cart:', response);

        // Show SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Added!',
          text: 'The product has been successfully added to the cart.',
          confirmButtonText: 'OK'
        });

      }, error => {
        console.error('Error adding item to cart:', error);

        // Show error message if the operation fails
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Failed to add the product to the cart.',
          confirmButtonText: 'OK'
        });
      });
    }
    else {


      //debugger

      this._ser.getProductInfoForCart(productId).subscribe((info) => {
        //debugger
        BScartItem.name = info.name,
          BScartItem.image = info.image,
          BScartItem.price = info.price,
          this._ser.BSAddToCart({ ...BScartItem })
      })


      console.log(BScartItem)

      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: 'The product has been successfully added to the cart.',
        confirmButtonText: 'OK'
      });
    }


  }



}
