import { Component } from '@angular/core';
import { UrlService } from '../../URL-Service/url.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
      Swal.fire({
        icon: "success",
        title: "Subscribed Successfully!",
        showConfirmButton: false,
        timer: 2000
      });
      this._router.navigate(['/LogIn'])
    },
      (error) => {
        alert(error.error)
      }

    )
  }
}
