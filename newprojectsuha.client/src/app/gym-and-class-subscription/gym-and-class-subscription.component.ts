import { Component } from '@angular/core';
import { UrlService } from '../URL-Service/url.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


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

  getSubscriptions(id: number) {
    this._ser.GetSubscriptions(id).subscribe((data) => {
      console.log(data); 
      this.arrayOfSubscriptions = data;
    })
  }

  AvailabelTimeId = localStorage.getItem('AvailabelTimeId');

  subscriptionData =
    {
      "userId": 2,
      "classSubId": 0,
      "classTimeId": this.AvailabelTimeId,
    }

  AddSubscription(id: any) {
    this.subscriptionData.classSubId = id;

    this._ser.addSubscribtionToEnrolled(this.subscriptionData).subscribe(
      () => {
        Swal.fire({
          icon: "success",
          title: "Subscribed Successfully!",
          showConfirmButton: false,
          timer: 2000
        });      },
      (error) => {
        Swal.fire({
          icon: "warning",
          title: `${error.error}`,
          showConfirmButton: false,
          timer: 2000
        });
}
    );
  }


}
