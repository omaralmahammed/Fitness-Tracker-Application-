import { Component } from '@angular/core';
import { UrlService } from '../URL-Service/url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gym-and-class-items',
  templateUrl: './gym-and-class-items.component.html',
  styleUrl: './gym-and-class-items.component.css'
})
export class GymAndClassItemsComponent {

  itemType: any

  ngOnInit() {
    this.itemType = this._route.snapshot.paramMap.get("type");

    this.getItems(this.itemType)
  }
  constructor(private _ser: UrlService, private _route: ActivatedRoute) { }


  arrayOfItems: any

  getItems(type: string) {
    this._ser.GetGymAndClassItems(type).subscribe((data) => {
      this.arrayOfItems = data;
    })
  }

}
