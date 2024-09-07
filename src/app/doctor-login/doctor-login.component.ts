import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-doctor-login',
  standalone: true,
  imports: [FormsModule, 
    CommonModule, 
    RouterModule, 
    HttpClientModule],
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css']
})
export class DoctorLoginComponent {
  username: string = '';
  password: string = '';
  doctorId: Number | null = null;
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
 this.http.post<{message:string, doctorId: Number}>('http://localhost:8080/api/doctors/login', null, { params })
 .subscribe(
  response => {

    
    console.log('Login successful', response.message);
    
    //attribute doctorId to response
   this.doctorId = response.doctorId
   
   //show doctorID in console TODO: remove in production!!!
   console.log('Doctor ID:', this.doctorId);     
   
   //Send doctor id to patient dashboard component. VERY IMPORTANT THAT THIS WORKS!!!!
   this.router.navigate(['/doctor-dashboard'], { queryParams: { doctorId: response.doctorId } });
    
  },
  error => {
    console.error('Login failed', error);
    this.errorMessage = 'Login failed';
    // Handle the error, display an error message, or redirect to an error page
  }
);
 }
}
