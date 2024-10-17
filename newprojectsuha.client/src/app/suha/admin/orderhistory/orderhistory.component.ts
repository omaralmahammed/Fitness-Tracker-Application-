import { Component } from '@angular/core';
import { UrlService } from '../../../URL-Service/url.service';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrl: './orderhistory.component.css'
})

//export class AdminOrdersComponent {
//  orders: any[] = []; // Array to hold orders
//  selectedOrderItems: any[] = []; // Array to hold selected order items
//  userId: number = 1; // Set this to the actual UserId you want to fetch orders for

//  constructor(private orderService: UrlService) { }

//  ngOnInit(): void {
//    this.getAllOrders();
//    console.log(this.selectedOrderItems)
//  }

//  getAllOrders(): void {
//    this.orderService.getAllOrders().subscribe(
//      (data: any) => {
//        this.orders = data; // Assign fetched orders to the array
//      },
//      error => {
//        console.error('Error fetching orders:', error);
//      }
//    );
//  }

//  // Method to fetch order items based on the selected order
//  getOrderItems(orderId: number): void {
//    this.orderService.getOrderItems(orderId).subscribe(
//      data => {
//        this.selectedOrderItems = data; // Assign fetched order items to the array
//      },
//      error => {
//        console.error('Error fetching order items:', error);
//      }
//    );
//  }

export class AdminOrdersComponent {
  orders: any[] = []; // Array to hold orders
  selectedOrderItems: any[] = []; // Array to hold selected order items
  userId: number = 1; // Set this to the actual UserId you want to fetch orders for
  showModal: boolean = false; // Manage modal visibility

  constructor(private orderService: UrlService) { }

  ngOnInit(): void {
    this.getAllOrders();
    console.log(this.selectedOrderItems);
  }

  getAllOrders(): void {
    this.orderService.getAllOrders().subscribe(
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
        this.selectedOrderItems = data.map((item: any) => {
          return {
            ...item,
            total: item.price * item.quantity
          };
        });; // Assign fetched order items to the array
        this.showModal = true; // Show the modal
      },
      error => {
        console.error('Error fetching order items:', error);
      }
    );
  }

  closeModal(): void {
    this.showModal = false; // Hide the modal
    this.selectedOrderItems = []; // Clear the selected order items
  }
}
