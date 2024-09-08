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

  weightMeasurements: any[] = [];
  bloodPressureMeasurements: any[] = [];
  neuroMeasurements: any[] = [];

  showModifyDetailsModal = false;
  showAddBloodPressureModal = false;
  showAddWeightModal = false;
  showAddNeuroModal = false;

  modifyDetailsForm = {
    dateOfBirth: '',
    password: '',
    confirmPassword: ''

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


  averageWeightForMonth: number | null = null;
  averageWeightForYear: number | null = null;


  averageBloodPressureForMonth= {
    systolicPressure: 0,
    diastolicPressure: 0,
    pulse: 0
  };
  averageBloodPressureForYear= {
    systolicPressure: 0,
    diastolicPressure: 0,
    pulse: 0
  };

  averageNeuroForMonth: number | null = null;
  averageNeuroForYear: number | null = null;

   // Define requestMonitor
   requestMonitor: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.patientId = params['patientId'];
    });


    //Initialize requestMonitor
    this.requestMonitor = {
      requestCount: 0,
      requestErrorCount: 0
    }
  }

  ngOnInit() {
    this.loadMeasurements();
    this.getAverageWeightForMonth(); // Ensure this method is called
    this.getAverageWeightForYear();
    this.getAverageBloodPressureForMonth();
    this.getAverageBloodPressureForYear();
    this.getAverageNeuroMeasurementForMonth();
    this.getAverageNeuroMeasurementForYear();

  }

  loadMeasurements() {
    this.loadBloodPressureMeasurements();
    this.loadWeightMeasurements();
    this.loadNeuroMeasurements();
  }


  //method that fetches the average bloodpressure of the patient for this year from the backendd using the following Controller method:
  
  getAverageBloodPressureForYear() {
    this.http.get<any>(`http://localhost:8080/api/patients/${this.patientId}/blood-pressure-measurements/average-year`)
      .subscribe(data => {
        this.averageBloodPressureForYear = data;
        console.log('Average Blood Pressure for Year:', data);
      }, error => {
        console.error('Error fetching average blood pressure for year:', error);
      });
  }


  //method that fetches the average bloodpressure of the patient for this month from the backendd using the following Controller method:


   
getAverageBloodPressureForMonth() {
  this.http.get<any>(`http://localhost:8080/api/patients/${this.patientId}/blood-pressure-measurements/average-month`)
    .subscribe(data => {
      this.averageBloodPressureForMonth = {
        systolicPressure: data.systolicPressure,
        diastolicPressure: data.diastolicPressure,
        pulse: data.pulse
      };
      console.log('Average Blood Pressure for Month:', data);
    }, error => {
      console.error('Error fetching average blood pressure for month:', error);
    }
  );
}


 //method that fetches the average weight of the patient for the current month
    
    getAverageWeightForMonth() {
      console.log('now getting average weight for month');

      this.http.get<number>(`http://localhost:8080/api/patients/${this.patientId}/weight-measurements/average-month`)
        .subscribe(data => {
          this.averageWeightForMonth = data;
          console.log('Average Weight for Month:', data);
        }, error => {
          console.error('Error fetching average weight for month:', error);
        });        
    }


    //method that fetches the average weight of the patient for the current year

    getAverageWeightForYear() {

      console.log('now getting average weight for year');


      this.http.get<number>(`http://localhost:8080/api/patients/${this.patientId}/weight-measurements/average-year`)
        .subscribe(data => {
          this.averageWeightForYear = data;
          console.log('Average Weight for Year:', data);
        }, error => {
          console.error('Error fetching average weight for year:', error);
        }
      );
    }



    //method that fetches the average neuro measurement of the patient for the current month

    getAverageNeuroMeasurementForMonth() {
      this.http.get<number>(`http://localhost:8080/api/patients/${this.patientId}/neuro-measurements/average-month`)
       .subscribe(data => {
        this.averageNeuroForMonth = data;
          console.log('Average Neuro Measurement for Month:', data);
        }, error => {
          console.error('Error fetching average neuro measurement for month:', error);
        });
    }
        


    //method that fetches the average neuro measurement of the patient for the current year

    getAverageNeuroMeasurementForYear() {
      this.http.get<number>(`http://localhost:8080/api/patients/${this.patientId}/neuro-measurements/average-year`)
       .subscribe(data => {
          this.averageNeuroForYear = data;
          console.log('Average Neuro Measurement for Year:', data);
          }, error => {
          console.error('Error fetching average neuro measurement for year:', error);
          });
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
    this.http.delete(`http://localhost:8080/api/patients/blood-pressure-measurements/${id}`, { observe: 'response', responseType: 'text' })
      .subscribe({
        next:(response:any) => {
          if (response.status === 200) {
            console.log('Blood pressure measurement deleted successfully');
            alert('Blood pressure measurement deleted successfully');
            this.loadBloodPressureMeasurements();
          } else {
            console.error('Unexpected response status:', response.status);
          }
        },
        error: (error) => {
          console.error('Error deleting blood pressure measurement:', error);
        }
      });
  }



  deleteWeightMeasurement(id: number) {
    this.http.delete(`http://localhost:8080/api/patients/weight-measurements/${id}`, { observe: 'response', responseType: 'text' })
      .subscribe({
        next:(response:any) => {
          if (response.status === 200) {
            console.log('Weight measurement deleted successfully');
            alert('Weight measurement deleted successfully');
            this.loadWeightMeasurements();
          } else {
            console.error('Unexpected response status:', response.status);
          }
        },
        error: (error) => {
          console.error('Error deleting weight measurement:', error);
        }
      });
  }

  deleteNeuroMeasurement(id: number) {
    this.http.delete(`http://localhost:8080/api/patients/neuro-measurements/${id}`, { observe: 'response', responseType: 'text' })
      .subscribe({
        next:(response:any) => {
          if (response.status === 200) {
            console.log('Neuro measurement deleted successfully');
            alert('Neuro measurement deleted successfully');
            this.loadNeuroMeasurements();
          } else {
            console.error('Unexpected response status:', response.status);
          }
        }, error: (error) => {
          console.error('Error deleting neuro measurement:', error);
        }
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


  

  submitNewPassword() {
    const newPassword = this.modifyDetailsForm.password;
    const id = this.patientId;
  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    this.http.put(`http://localhost:8080/api/patients/${id}/update-password`, null, {
      headers,
      params: new HttpParams().set('password', newPassword),
      responseType: 'text'
    }).subscribe(
      response => {
        alert('Password updated successfully');
        console.log('Password updated successfully', response);
        this.closeModifyDetailsModal();
      },
      error => {
        alert('Error updating password');
        console.error('Error updating password', error);
      }
    );
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
    this.loadNeuroMeasurements();
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
          
        },
        error => {
          alert('Error adding neuro measurement');
          console.error('Error adding neuro measurement', error);
        }
      );
      
  }
}