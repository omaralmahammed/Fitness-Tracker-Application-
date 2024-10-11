import { Component } from '@angular/core';
import { UrlService } from '../URL-Service/url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent {

  itemId: any

  ngOnInit() {
    this.itemId = this._route.snapshot.paramMap.get("id");

    this.getItems(this.itemId)
    this.getIAvailableTimes(this.itemId)
  }
  constructor(private _ser: UrlService, private _route: ActivatedRoute) { }


  itemDetails: any

  getItems(id: number) {
    this._ser.GetGymAndClassItemDetails(id).subscribe((data) => {
      this.itemDetails = data;
    })
  }


  availableTimesArray: any

  getIAvailableTimes(id: number) {
    this._ser.GetGymAndClassItemAvailableTime(id).subscribe((data) => {
      this.availableTimesArray = data;
    })
  }

}
