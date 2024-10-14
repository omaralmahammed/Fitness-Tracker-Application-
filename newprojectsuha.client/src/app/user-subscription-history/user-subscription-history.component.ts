import { Component } from '@angular/core';
import { UrlService } from '../URL-Service/url.service';

@Component({
  selector: 'app-user-subscription-history',
  templateUrl: './user-subscription-history.component.html',
  styleUrl: './user-subscription-history.component.css'
})
export class UserSubscriptionHistoryComponent {

  //userId: any = 1
  userId: any

  classList : any
  gymList : any

  constructor(private _ser: UrlService) { }

  ngOnInit(): void {
    this._ser.UserIdObserve.subscribe((data) => {
      this.userId = data
    })

    this.getUserClasses(this.userId, "Class")
    this.getUserGyms(this.userId, "GYM")
    
  }


  getUserClasses(userId: number, flag: string) {
    this._ser.getUserSubscriptions(userId, flag).subscribe((data) => {
      this.classList = data
    })
  }


  getUserGyms(userId: number, flag: string) {
    this._ser.getUserSubscriptions(userId, flag).subscribe((data) => {
      this.gymList = data
    })
  }



}
