import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-patient-register',
  standalone: true,
  imports: [FormsModule, 
            CommonModule, 
            RouterModule, 
            HttpClientModule],

  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.css']
})
export class PatientRegisterComponent {
  patient = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: ''
  };

  passwordMisMatch = false;

  
  constructor(private http: HttpClient) {}

  registerPatient() {
    if (this.patient.password !== this.patient.confirmPassword) {
      this.passwordMisMatch = true;
      return;
    }
  
    this.passwordMisMatch = false;
  
  
    // Log the admin object to check its values
    console.log('Patient object:', this.patient);
  
    
  
  
    
      this.http.post<any>('http://localhost:8080/api/patients/registerPatient', this.patient).subscribe(
        (response) => {
          console.log('Patient registered successfully', response);
          // Add any additional logic or redirect to a success page
          //Return to the home page
          window.location.href = '/home';
        },
        (error) => {
          console.error('Failed to register patient:', error);
          // Handle the error, display an error message, or redirect to an error page
          //return to the home page
          window.location.href = '/home';
          
        }
      );
    }
  }



