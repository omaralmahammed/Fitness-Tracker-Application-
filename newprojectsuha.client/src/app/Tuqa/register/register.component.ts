import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  loginData = {
    email: '',
    password: ''
  };
  constructor(private http: HttpClient, private router: Router) { }

  onSubmit(form: any) {
    if (form.valid) {
      const formData = new FormData();
      formData.append('Email', this.loginData.email);
      formData.append('Password', this.loginData.password);

      this.http.post('https://localhost:7286/api/User/LOGIN', formData)
        .subscribe(
          (response) => {
            console.log('Login successful:', response);
            // Handle success, maybe redirect the user
            // this.router.navigate(['/dashboard']); // Example redirect
          },
          (error) => {
            console.error('Login failed:', error);
            // Handle error (e.g., show error message to user)
          }
        );
    } else {
      console.log('Form is invalid');
    }
  }
}
