import { Component, OnInit } from '@angular/core';
import { UrlService } from '../../../../URL-Service/url.service';  // Import the service

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  gymAndClassItems: any[] = [];  // Property to store the gyms and classes

  constructor(private urlService: UrlService) { }

  ngOnInit(): void {
    this.loadGymAndClassItems();  // Call the method when the component initializes
  }

  loadGymAndClassItems(): void {
    this.urlService.GetGymAndClassItems('All')   
      .subscribe( (data) => {
        this.gymAndClassItems = data;
        console.log(this.gymAndClassItems);
        }
 
      );
  }

}
