import { Component } from '@angular/core';
import { UrlService } from '../URL-Service/url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gym-and-class-subscription',
  templateUrl: './gym-and-class-subscription.component.html',
  styleUrl: './gym-and-class-subscription.component.css'
})
export class GymAndClassSubscriptionComponent {

  classId: any

  ngOnInit() {
    this.classId = this._route.snapshot.paramMap.get("id");

    this.getSubscriptions(this.classId)

  }
  constructor(private _ser: UrlService, private _route: ActivatedRoute) { }


  arrayOfSubscriptions: any
  AvailabelTimeId = localStorage.getItem('AvailabelTimeId');

  getSubscriptions(id: number) {
    this._ser.GetSubscriptions(id).subscribe((data) => {
      console.log(data); 
      this.arrayOfSubscriptions = data;
    })
    console.log(this.AvailabelTimeId)
  }


 
  

  //subscriptionData =
  //  {
  //    "userId": 42,
  //    "subServiceId": 2,
  //    "scriptionId": 2
  //  }




}
