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
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class 
DoctorDashboardComponent implements OnInit {





 patientId: number =0;

  doctorId: number | null = null;

  patients: any[] = [];
  weightMeasurements: any[] = [];
  bloodPressureMeasurements: any[] = [];
  neuroMeasurements: any[] = [];

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
      this.doctorId = params['doctorId'];
    });


    //Initialize requestMonitor
    this.requestMonitor = {
      requestCount: 0,
      requestErrorCount: 0
    }
  }

  ngOnInit() {
    this.fetchPatients();
    this.loadMeasurements();
    this.getAverageWeightForMonth(); 
    this.getAverageWeightForYear();
    this.getAverageBloodPressureForMonth();
    this.getAverageBloodPressureForYear();
    this.getAverageNeuroMeasurementForMonth();
    this.getAverageNeuroMeasurementForYear();

  }



  fetchPatients() {
    this.http.get<any[]>('http://localhost:8080/api/admins/patients')
      .subscribe(data => this.patients = data);
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
        this.averageBloodPressureForYear = {
          systolicPressure: data.systolicPressure,
          diastolicPressure: data.diastolicPressure,
          pulse: data.pulse
        };
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
    });
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

  viewPatient(patientId: number) {
    // Select patient from list of patients on the html page
    this.patientId = patientId;
    // Refresh the page to load and display the correct measurements
    this.loadMeasurements();
    this.getAverageWeightForMonth(); 
    this.getAverageWeightForYear();
    this.getAverageBloodPressureForMonth();
    this.getAverageBloodPressureForYear();
    this.getAverageNeuroMeasurementForMonth();
    this.getAverageNeuroMeasurementForYear();
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

}
