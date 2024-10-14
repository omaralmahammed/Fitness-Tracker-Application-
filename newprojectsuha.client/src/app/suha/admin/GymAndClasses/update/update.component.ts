import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../../../URL-Service/url.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  item: any = {};
  id: number;

  constructor(
    private urlService: UrlService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadItemDetails();
  }

  loadItemDetails(): void {
    this.urlService.GetClassAndGym(this.id).subscribe({
      next: (data) => {
        this.item = data;
      },
      error: (error) => {
        console.error('Error fetching item details:', error);
      }
    });
  }


  updateItem(): void {
    this.urlService.UpdateClassAndGym(this.id, this.item).subscribe({
      next: () => {
        Swal.fire('Updated!', 'The item has been updated successfully.', 'success')
          .then(() => {
            this.router.navigate(['/dash/Display_GymAndClasses']);
          });
      },
      error: (error) => {
        console.error('Error updating item:', error);
        Swal.fire('Error', 'Failed to update item. Please try again.', 'error');
      }
    });
  }
}
