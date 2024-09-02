import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, 
    CommonModule, 
    RouterModule, 
    HttpClientModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post<any>('http://localhost:8080/api/admins/login', { username: this.username, password: this.password })
      .subscribe(
        response => {
          console.log('Login successful', response);
          this.router.navigate(['/admin-dashboard']);
        },
        error => {
          console.error('Login failed', error);
          this.errorMessage = 'Invalid username or password';
        }
      );
  }
}
