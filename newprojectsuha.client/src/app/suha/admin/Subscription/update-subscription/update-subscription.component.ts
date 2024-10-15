import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../../../URL-Service/url.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-subscription',
  templateUrl: './update-subscription.component.html',
  styleUrls: ['./update-subscription.component.css']
})
export class UpdateSubscriptionComponent  {
 
  parameter: any;

  ngOnInit() {
    this.parameter = this._active.snapshot.paramMap.get('id');
  }

  constructor(private _ser: UrlService, private _active: ActivatedRoute) { }

  editSubscription(data: any) {
    var form = new FormData();

    // إضافة البيانات إلى FormData
    for (let key in data) {
      form.append(key, data[key]);
    }

    // استدعاء الخدمة لتحديث الاشتراك بدون التعامل مع الصورة
    this._ser.UpdateSubscription(this.parameter, form).subscribe((data) => {
      alert("Subscription updated successfully");
    });
  }

}
