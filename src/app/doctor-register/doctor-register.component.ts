import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-register',
  standalone: true,
  imports: [FormsModule,
            CommonModule],

  templateUrl: './doctor-register.component.html',
  styleUrl: './doctor-register.component.css'
})
export class DoctorRegisterComponent {
  doctor = {
    firstName: '',
    lastName: '',
    rizivNumber: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private http: HttpClient) {}

  registerDoctor() {
    this.http.post('/api/doctors/registerDoctor', this.doctor).subscribe(
      () => {
        console.log('Doctor registered successfully');
        // Add any additional logic or redirect to a success page
      },
      (error) => {
        console.error('Failed to register doctor:', error);
        // Handle the error, display an error message, or redirect to an error page
      }
    );
    
  }
}
