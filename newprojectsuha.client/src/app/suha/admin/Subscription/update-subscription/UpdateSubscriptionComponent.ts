import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UrlService } from "../../../../URL-Service/url.service";


@Component({
    selector: 'app-update-subscription',
    templateUrl: './update-subscription.component.html',
    styleUrls: ['./update-subscription.component.css']
})
export class UpdateSubscriptionComponent {

    parameter: any;

    ngOnInit() {
        this.parameter = this._active.snapshot.paramMap.get('id');
        this.GetClassAndGymName();
    }

    constructor(private _ser: UrlService, private _active: ActivatedRoute) { }




    editSubscription(data: any) {
      debugger;
        var form = new FormData();
        for (let key in data) {
            form.append(key, data[key]);
        }

        this._ser.UpdateSubscription(this.parameter, form).subscribe((data) => {
            alert("ok");
        });
    }




    ClassName: any;

    GetClassAndGymName() {
        this._ser.GetClassAndGyms().subscribe((data) => {
            this.ClassName = data;
        });
    }

}
