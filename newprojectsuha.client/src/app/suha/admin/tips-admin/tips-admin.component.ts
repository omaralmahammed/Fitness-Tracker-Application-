import { Component } from '@angular/core';
import { UrlService } from '../../../URL-Service/url.service';

@Component({
  selector: 'app-tips-admin',
  templateUrl: './tips-admin.component.html',
  styleUrl: './tips-admin.component.css'
})
export class TipsAdminComponent {
  ngOnInit() {

    this.getTips();
  }
  constructor(private _ser: UrlService) {


  }

 TipsArray: any
  getTips() {
    this._ser.getallTips().subscribe((data) => {
      this.TipsArray = data
      console.log(this.TipsArray, "this.TipsArray")
    })

  }

  deleteTips(id: any) {
    this._ser.deleteTip(id).subscribe(() => {
      alert("delete Tip successfully")
      this.getTips()
    })
  }
}
