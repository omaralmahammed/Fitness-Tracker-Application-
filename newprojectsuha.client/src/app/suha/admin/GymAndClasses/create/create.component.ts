import { Component } from '@angular/core';
import { UrlService } from '../../../../URL-Service/url.service';  // Import the service
import { Router } from '@angular/router';  // Import Router for navigation
import Swal from 'sweetalert2';


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
    this.urlService.CreateClassAndGym(this.newItem).subscribe({
      next: (response) => {
        console.log('Item created successfully:', response);
        Swal.fire('Success', 'New gym/class item created successfully', 'success')
          .then(() => {
            this.router.navigate(['/dash/Display_GymAndClasses']);
          });
      },
      error: (error) => {
        console.error('Error creating item:', error);
        Swal.fire('Error', 'Failed to create new item. Please try again.', 'error');
      }
    });
  }
 
}
