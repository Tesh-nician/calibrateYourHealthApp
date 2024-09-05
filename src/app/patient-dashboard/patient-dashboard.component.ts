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
  imports: [FormsModule, CommonModule, RouterModule, HttpClientModule],
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

  bloodPressureMeasurements: any[] = [];
  weightMeasurements: any[] = [];
  neuroMeasurements: any[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.patientId = params['patientId'];
    });
  }

  ngOnInit() {
    this.loadMeasurements();
  }

  loadMeasurements() {
    this.loadBloodPressureMeasurements();
    this.loadWeightMeasurements();
    this.loadNeuroMeasurements();
  }

  loadBloodPressureMeasurements() {
    this.http.get<any[]>(`http://localhost:8080/api/patients/${this.patientId}/blood-pressure-measurements`)
      .subscribe(data => {
        this.bloodPressureMeasurements = data;
      });
  }

  loadWeightMeasurements() {
    this.http.get<any[]>(`http://localhost:8080/api/patients/${this.patientId}/weight-measurements`)
      .subscribe(data => {
        this.weightMeasurements = data;
      });
  }

  loadNeuroMeasurements() {
    this.http.get<any[]>(`http://localhost:8080/api/patients/${this.patientId}/neuro-measurements`)
      .subscribe(data => {
        this.neuroMeasurements = data;
      });
  }

  deleteBloodPressureMeasurement(id: number) {
    this.http.delete(`http://localhost:8080/api/patients/blood-pressure-measurements/${id}`)
      .subscribe(() => {
        this.loadBloodPressureMeasurements();
      });
  }

  deleteWeightMeasurement(id: number) {
    this.http.delete(`http://localhost:8080/api/patients/weight-measurements/${id}`)
      .subscribe(() => {
        this.loadWeightMeasurements();
      });
  }

  deleteNeuroMeasurement(id: number) {
    this.http.delete(`http://localhost:8080/api/patients/neuro-measurements/${id}`)
      .subscribe(() => {
        this.loadNeuroMeasurements();
      });
  }

  updateBloodPressureMeasurement() {
    this.loadBloodPressureMeasurements();
  }

  updateWeightMeasurement() {
    this.loadWeightMeasurements();
  }

  updateNeuroMeasurement() {
    this.loadNeuroMeasurements();
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
    const bloodPressureMeasurement = {
      systolicPressure: this.bloodPressureForm.systolicPressure,
      diastolicPressure: this.bloodPressureForm.diastolicPressure,
      pulse: this.bloodPressureForm.pulse,
      date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      bloodPressureComment: this.bloodPressureForm.comment,
      patient: { id: this.patientId } //in backend this should be a patient object
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post('http://localhost:8080/api/patients/blood-pressure-measurements', bloodPressureMeasurement, { headers, responseType: 'text' })
      .subscribe(
        response => {
          alert('Blood pressure measurement added successfully');
          console.log('Blood pressure measurement added successfully', response);
          this.closeAddBloodPressureModal();
          this.loadBloodPressureMeasurements();
        },
        error => {
          alert('Error adding blood pressure measurement');
          console.error('Error adding blood pressure measurement', error);
        }
      );
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
      patient: { id: this.patientId } //in backend this should be a patient object
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post('http://localhost:8080/api/patients/weight-measurements', weightMeasurement, { headers, responseType: 'text' })
      .subscribe(
        response => {
          alert('Weight measurement added successfully');
          console.log('Weight measurement added successfully', response);
          this.closeAddWeightModal();
          this.loadWeightMeasurements();
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
    const neuroMeasurement = {
      neuroMeasurement: this.neuroForm.neuroMeasurement,
      date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      neuroComment: this.neuroForm.comment,
      patient: { id: this.patientId } //in backend this should be a patient object
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post('http://localhost:8080/api/patients/neuro-measurements', neuroMeasurement, { headers, responseType: 'text' })
      .subscribe(
        response => {
          alert('Neuro measurement added successfully');
          console.log('Neuro measurement added successfully', response);
          this.closeAddNeuroModal();
          this.loadNeuroMeasurements();
        },
        error => {
          alert('Error adding neuro measurement');
          console.error('Error adding neuro measurement', error);
        }
      );
  }
}