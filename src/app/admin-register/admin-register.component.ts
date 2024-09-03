import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-register',
  standalone: true,
  imports: [FormsModule,
            CommonModule,
            RouterModule,
            HttpClientModule,
         ],

  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent {
  admin = {
    username: '',
    password: '',
    confirmPassword: ''
  };
  errorMessage = '';


  passwordMisMatch = false;

  constructor(private http: HttpClient, private router: Router) {}

  registerAdmin() {

  if (this.admin.password !== this.admin.confirmPassword) {
     this.passwordMisMatch = true;
    return;
  }
 
 
 


    this.passwordMisMatch = false;


  // Log the admin object to check its values
  console.log('Admin object:', this.admin);


 //Construct params object
 const params = new HttpParams()
      .set('username', this.admin.username)
      .set('password', this.admin.password);

    console.log('Params:', params);
 

     // Log the admin object to check its values
  console.log('Admin object:', this.admin);

   // Make a POST request to the server to register the admin
   this.http.post('http://localhost:8080/api/admins/registerAdmin', null, { params, responseType: 'text' })
   .subscribe(
     response => {
       console.log('Admin registered successfully', response);
       this.router.navigate(['/admin-login']);
     },
     error => {
       console.error('Failed to register admin:', error);
       this.errorMessage = 'Failed to register admin';
       // Handle the error, display an error message, or redirect to an error page
     }
   );
  }
}
