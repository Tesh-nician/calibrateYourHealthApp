import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-doctor-register',
  standalone: true,
  imports: [FormsModule, 
            CommonModule, 
            RouterModule, 
            HttpClientModule],

  templateUrl: './doctor-register.component.html',
  styleUrls: ['./doctor-register.component.css']
})
export class DoctorRegisterComponent {
  doctor = {
    firstName: '',
    lastName: '',
    rizivNumber: 0,
    password: '',
    confirmPassword: ''
  };

  passwordMisMatch = false;

  
  constructor(private http: HttpClient) {}

  registerDoctor() {
    if (this.doctor.password !== this.doctor.confirmPassword) {
      this.passwordMisMatch = true;
      return;
    }
  
    this.passwordMisMatch = false;
  
  
    // Log the admin object to check its values
    console.log('Doctor object:', this.doctor);
  
     //Construct params object
 const params = new HttpParams()
  .set('firstname', this.doctor.firstName)
  .set('lastname', this.doctor.lastName)
  .set('rizivnumber', this.doctor.rizivNumber)
  .set('password', this.doctor.password);




console.log('Params:', params);
  
  
    
      this.http.post('http://localhost:8080/api/doctors/registerDoctor', null, { params, responseType: 'text' }).subscribe(
        (response) => {
          console.log('Doctor registered successfully', response);
          // Add any additional logic or redirect to a success page
          //Return to the home page
          window.location.href = '/doctor-login';
        },
        (error) => {
          console.error('Failed to register doctor:', error);
          // Handle the error, display an error message, or redirect to an error page
          //return to the home page
          window.location.href = '/home';
          
        }
      );
    }
  }


