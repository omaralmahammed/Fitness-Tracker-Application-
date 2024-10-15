import { Component } from '@angular/core';
import { UrlService } from '../URL-Service/url.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {

  UserId: any;
  userData: any;

  ngOnInit() {
    // Subscribe to UserId and handle it once it's emitted
    this._ser.UserIdObserve.subscribe((UserId) => {
      this.UserId = UserId;

      if (this.UserId) {
        this.showUserDetails(this.UserId);
      } else {
        console.log('UserId is undefined or null.');
      }
    });

    console.log(this.userData)
  }

  constructor(private _ser: UrlService, private _router: Router) { }

  showUserDetails(id: any) {
    this._ser.getUserInfo(id).subscribe((data) => {
      this.userData = data;
      console.log('UserData received: ', this.userData); // Debugging line
    });
  }



  submitUserInfo(data: any) {
    var formdata = new FormData();

    for (let item in data) {
      formdata.append(item, data[item])
    }


    this._ser.changeUserInfo(this.UserId, formdata).subscribe(() => {
      Swal.fire({
        icon: "success",
        title: "Your Information was Updated",
        showConfirmButton: false,
        timer: 2000
      });
      this._router.navigate(['/'])
    })
  }

 



}
