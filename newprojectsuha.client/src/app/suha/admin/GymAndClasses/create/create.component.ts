import { Component } from '@angular/core';
import { UrlService } from '../../../../URL-Service/url.service';  // Import the service
import { Router } from '@angular/router';  // Import Router for navigation

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']  
})
export class CreateComponent {
  newItem: any = {
    name: '',
    trainer: '',
    description: '',
    price: null,
    flag: '',   
    image: ''
  };  // Property to hold the new item data

  constructor(private urlService: UrlService, private router: Router) { }

  createItem(): void {
    this.urlService.CreateClassAndGym(this.newItem)  // Call the service to create a new item
      .subscribe({
        next: (response) => {
          console.log('Item created successfully:', response);
          this.router.navigate(['/display']);  // Navigate back to the display page after creation
        },
        error: (error) => {
          console.error('Error creating item:', error);
        }
      });
  }
}
