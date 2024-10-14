import { Component } from '@angular/core';
import { UrlService } from '../URL-Service/url.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-gym-and-class-subscription',
  templateUrl: './gym-and-class-subscription.component.html',
  styleUrl: './gym-and-class-subscription.component.css'
})
export class GymAndClassSubscriptionComponent {

  classId: any
  UserId: any
  ngOnInit() {
    this.classId = this._route.snapshot.paramMap.get("id");

    this.getSubscriptions(this.classId)

    this._ser.UserIdObserve.subscribe((UserId) => {
      this.UserId = UserId;
    });
  }
  constructor(private _ser: UrlService, private _route: ActivatedRoute, private url: UrlService, private _router: Router ) { }


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
    this.subscriptionData.userId = this.UserId;
    this.subscriptionData.classSubId = id;

    this.url.UserIdObserve.subscribe((userId: any) => {
      if (userId === "") {
        Swal.fire({
          icon: "info",
          title: "You must be Login!",
          showConfirmButton: false,
          timer: 2000
        });

        localStorage.setItem("ClassId", this.classId);
        setTimeout(() => {
          this._router.navigate(['/LogIn']);
        }, 2000);
      } else {
        this._ser.addSubscribtionToEnrolled(this.subscriptionData).subscribe((data) => {
          const width = 600;
          const height = 700;
          const left = (screen.width / 2) - (width / 2);
          const top = (screen.height / 2) - (height / 2);

          const popupWindow = window.open(
            data.approvalUrl,
            'PayPal Payment',
            `width=${width},height=${height},top=${top},scrollbars=yes,resizable=yes`
          );

          const checkWindowClosed = setInterval(() => {
            if (popupWindow && popupWindow.closed) {
              clearInterval(checkWindowClosed);
              Swal.fire({
                icon: "success",
                title: "Subscribed Successfully!",
                showConfirmButton: false,
                timer: 2000
              }).then(() => {
                setTimeout(() => {
                  this._router.navigate(['/usersubscriptions']);
                }, 1000);
              });
            }
          }, 500);
        }, (error) => {
          Swal.fire({
            icon: "info",
            title: "You are subscription in this subscription before!",
            showConfirmButton: false,
            timer: 2000
          });
        });
      }
    });
  }
 }

