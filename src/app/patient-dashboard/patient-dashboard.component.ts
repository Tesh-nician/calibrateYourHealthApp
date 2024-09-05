import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';



@Component({
  standalone: true,
  imports: [  FormsModule
            , CommonModule
            , RouterModule
            , HttpClientModule                       
          ],
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {

  patientId: number | null = null;

  showModifyDetailsModal = false;
  showAddBloodPressureModal = false;
  showAddWeightModal = false;
  showAddNeuroModal = false;

  modifyDetailsForm = {
    dateOfBirth: '',
    password: ''
  };

  bloodPressureForm = {
    systolicPressure: 0,
    diastolicPressure: 0,
    pulse: 0,
    comment: ''
  };

  weightForm = {
    weight: 0,
    comment: ''
  };

  neuroForm = {
    neuroMeasurement: 0,
    comment: ''
  };

  constructor(private http: HttpClient, private route:ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.patientId = params['patientId'];
    });
  }

  ngOnInit() {
    this.loadCharts();
  }

  loadCharts() {
    // Load charts using a charting library like Chart.js or D3.js
  }

  logout() {
    window.location.href = 'http://localhost:4200/home';
  }

  modifyDetails() {
    this.showModifyDetailsModal = true;
  }

  closeModifyDetailsModal() {
    this.showModifyDetailsModal = false;
  }

  submitModifyDetails() {
    // Submit modify details form
    


    this.closeModifyDetailsModal();
  }

  addBloodPressureMeasurement() {
    this.showAddBloodPressureModal = true;
  }

  closeAddBloodPressureModal() {
    this.showAddBloodPressureModal = false;
  }

  submitBloodPressureMeasurement() {
    // Submit blood pressure measurement form
    this.closeAddBloodPressureModal();
  }

  addWeightMeasurement() {
    this.showAddWeightModal = true;
  }

  closeAddWeightModal() {
    this.showAddWeightModal = false;
  }

  submitWeightMeasurement() {
    const weightMeasurement = {
      weight: this.weightForm.weight,
      date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      weightComment: this.weightForm.comment,
      patient: { id: this.patientId} //in backend this should be a patient object
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post('http://localhost:8080/api/patients/weight-measurements', weightMeasurement, { headers })
      .subscribe(
        response => {
          alert('Weight measurement added successfully');
          console.log('Weight measurement added successfully', response);
          this.closeAddWeightModal();
        },
        error => {
          alert('Error adding weight measurement');
          console.error('Error adding weight measurement', error);
        }
      );
  }

  addNeuroMeasurement() {
    this.showAddNeuroModal = true;
  }

  closeAddNeuroModal() {
    this.showAddNeuroModal = false;
  }

  submitNeuroMeasurement() {
    // Submit neuro measurement form
    this.closeAddNeuroModal();
  }
}
