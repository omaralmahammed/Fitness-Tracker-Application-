import { Component } from '@angular/core';
import { UrlService } from '../URL-Service/url.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {

  orders: any[] = [];
  selectedOrderItems: any[] = [];
  userId: any
  //userId: any = 1
  itemTotal :any

  constructor(private _ser: UrlService) { }

  ngOnInit(): void {
    this._ser.UserIdObserve.subscribe((data) => {
      this.userId = data
    })

    this.getAllOrdersByUserId(this.userId);
  }

  getAllOrdersByUserId(userId: number) {
    this._ser.getAllOrdersByUserId(userId).subscribe((data: any) => {
        this.orders = data; 
      },
      error => {
        console.error('Error fetching orders:', error);
      }
    );
  }


  getOrderItems(orderId: number) {
    this._ser.getOrderItems(orderId).subscribe((data) => {
      this.selectedOrderItems = data.map((item: any) => {
        return {
          ...item,
          total: item.product.price * item.quantity
        };
      });

      },
      error => {
        console.error('Error fetching order items:', error);
      }
    );
  }

}
