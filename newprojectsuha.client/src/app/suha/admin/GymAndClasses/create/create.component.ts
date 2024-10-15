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

  constructor(private urlService: UrlService, private router: Router) { }

  imageFile: any
  changeImage(event: any) {

    this.imageFile = event.target.files[0]

  }

 
  createItem(data: any): void {
    // Assign the form data to `newItem`
    var formdata = new FormData();


    for (let item in data) {
      formdata.append(item, data[item])
    }

    formdata.append("Image", this.imageFile)

    // Call the API to create the new gym/class
    this.urlService.CreateClassAndGym(formdata).subscribe({
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
