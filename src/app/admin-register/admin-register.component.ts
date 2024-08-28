import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-register',
  standalone: true,
  imports: [FormsModule,
            CommonModule],

  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent {
  admin = {
    username: '',
    password: '',
    confirmPassword: ''
  };


  passwordMisMatch = false;

  constructor(private http: HttpClient) {}

registerAdmin() {
  if (this.admin.password !== this.admin.confirmPassword) {
    this.passwordMisMatch = true;
    return;
  }

  this.passwordMisMatch = false;



  
    this.http.post<any>('/api/admins/registerAdmin', this.admin).subscribe(
      () => {
        console.log('Admin registered successfully');
        // Add any additional logic or redirect to a success page
      },
      (error) => {
        console.error('Failed to register admin:', error);
        // Handle the error, display an error message, or redirect to an error page
      }
    );
  }
}
