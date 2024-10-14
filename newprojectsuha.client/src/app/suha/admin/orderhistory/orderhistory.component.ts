import { Component } from '@angular/core';
import { UrlService } from '../../../URL-Service/url.service';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrl: './orderhistory.component.css'
})

export class AdminOrdersComponent {
  orders: any[] = []; // Array to hold orders
  selectedOrderItems: any[] = []; // Array to hold selected order items
  userId: number = 1; // Set this to the actual UserId you want to fetch orders for

  constructor(private orderService: UrlService) { }

  ngOnInit(): void {
    this.getAllOrdersByUserId(this.userId);
  }

  getAllOrdersByUserId(userId: number): void {
    this.orderService.getAllOrdersByUserId(userId).subscribe(
      (data: any) => {
        this.orders = data; // Assign fetched orders to the array
      },
      error => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  // Method to fetch order items based on the selected order
  getOrderItems(orderId: number): void {
    this.orderService.getOrderItems(orderId).subscribe(
      data => {
        this.selectedOrderItems = data; // Assign fetched order items to the array
      },
      error => {
        console.error('Error fetching order items:', error);
      }
    );
  }
}
