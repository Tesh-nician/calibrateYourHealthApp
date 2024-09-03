import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-patient-login',
  standalone: true,
  imports: [FormsModule, 
    CommonModule, 
    RouterModule, 
    HttpClientModule],
  templateUrl: './patient-login.component.html',
  styleUrls: ['./patient-login.component.css']
})
export class PatientLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {

    //const payload = { username: this.username, password: this.password };
    //console.log('Payload:', payload);

    const params = new HttpParams()
      .set('username', this.username)
      .set('password', this.password);

      console.log('Params:', params);

 // Make a POST request to the server to login the admin
 this.http.post('http://localhost:8080/api/patients/login', null, { params, responseType: 'text' })
 .subscribe(
   response => {
     console.log('Login successful', response);
     this.router.navigate(['/patient-dashboard']);
   },
   error => {
     console.error('Login failed', error);
     this.errorMessage = 'Login failed';
     // Handle the error, display an error message, or redirect to an error page
   }
 );
  }
}