import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';


import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule
            , HttpClientModule],

  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
navigateToHome() {
  window.location.href = 'http://localhost:4200/home';
}

  admins: any[] = [];
  doctors: any[] = [];
  patients: any[] = [];

  

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchAdmins();
    this.fetchDoctors();
    this.fetchPatients();
  }

  fetchAdmins() {
    this.http.get<any[]>('http://localhost:8080/api/admins/alladmins')
      .subscribe(data => this.admins = data);
  }

  fetchDoctors() {
    this.http.get<any[]>('http://localhost:8080/api/admins/doctors')
      .subscribe(data => this.doctors = data);
  }

  fetchPatients() {
    this.http.get<any[]>('http://localhost:8080/api/admins/patients')
      .subscribe(data => this.patients = data);
  }

  deleteAdmin(id: number) {
    this.http.delete(`http://localhost:8080/api/admins/deleteadmin/${id}`, { observe: 'response', responseType: 'text' })
      .subscribe({
        next: (response: any) => {
          if (response.status === 200) {
            console.log('Admin deleted successfully');
            alert('Admin deleted successfully');
            this.fetchAdmins();
          } else {
            console.error('Unexpected response status:', response.status);
          }
        },
        error: (error) => {
          console.error('Error deleting admin:', error);
        }
      });
  }

  deleteDoctor(id: number) {
    this.http.delete(`http://localhost:8080/api/admins/doctors/${id}`, { observe: 'response', responseType: 'text' })
    .subscribe({
      next: (response) => {
        if (response.status === 200) {
          console.log('Doctor deleted successfully');
          alert('Doctor deleted successfully');
          this.fetchDoctors();
        } else {
          console.error('Unexpected response status:', response.status);
        }
      },
      error: (error) => {
        console.error('Error deleting doctor:', error);
      }
    });
  }

  deletePatient(id: number) {
    this.http.delete(`http://localhost:8080/api/admins/patients/${id}`, { observe: 'response', responseType: 'text' })
    .subscribe({
      next: (response) => {
        if (response.status === 200) {
          console.log('Patient deleted successfully');
          alert('Patient deleted successfully');
          this.fetchPatients();
        } else {
          console.error('Unexpected response status:', response.status);
        }
      },
      error: (error) => {
        console.error('Error deleting doctor:', error);
      }
    });
  }

  resetAdminPassword(id: number) {
    this.http.post(`http://localhost:8080/api/admins/resetAdminPassword/${id}`, {}, { observe: 'response', responseType: 'text' })
      .subscribe({
        next: (response) => {
          console.log('Response:', response);
          if (response.status === 200) {
            console.log('Admin password reset successfully');
            alert('Admin password reset successfully');
          } else {
            console.error('Unexpected response status:', response.status);
          }
        },
        error: (error) => {
          console.error('Error resetting admin password:', error);
        }
      });
  }

  resetDoctorPassword(id: number) {
    this.http.post(`http://localhost:8080/api/admins/resetDoctorPassword/${id}`, {}, { observe: 'response', responseType: 'text' })
      .subscribe({
        next: (response) => {
          console.log('Response:', response);
          if (response.status === 200) {
            console.log('Doctor password reset successfully');
            alert('Doctor password reset successfully');
          } else {
            console.error('Unexpected response status:', response.status);
          }
        },
        error: (error) => {
          console.error('Error resetting doctor password:', error);
        }
      });
  }
  

  resetPatientPassword(id: number) {
    this.http.post(`http://localhost:8080/api/admins/resetPatientPassword/${id}`, {}, { observe: 'response', responseType: 'text' })
      .subscribe({
        next: (response) => {
          console.log('Response:', response);
          if (response.status === 200) {
            console.log('Patient password reset successfully');
            alert('Patient password reset successfully');
          } else {
            console.error('Unexpected response status:', response.status);
          }
        },
        error: (error) => {
          console.error('Error resetting patient password:', error);
        }
      });
  }
  

}
