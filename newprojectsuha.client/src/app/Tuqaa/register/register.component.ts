import { Component } from '@angular/core';
import { UrlService } from '../../URL-Service/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  ngOnInit() { }


  constructor(private _ser: UrlService, private _router: Router) {

  }

  addnewUser(data: any) {
    debugger
    var form = new FormData();

    for (let key in data) {
      form.append(key, data[key])
    }

    this._ser.register(form).subscribe(() => {
      alert("user added successfully")
      this._router.navigate(['/login'])
    },
      (error) => {
        alert(error.error)
      }

    )
  }
}
