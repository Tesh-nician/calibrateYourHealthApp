import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { DoctorRegisterComponent } from './doctor-register/doctor-register.component';
import { PatientRegisterComponent } from './patient-register/patient-register.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { DoctorLoginComponent } from './doctor-login/doctor-login.component';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'admin-register', component: AdminRegisterComponent},
    {path: 'doctor-register', component: DoctorRegisterComponent},
    {path: 'patient-register', component: PatientRegisterComponent},
    {path: 'admin-login', component: AdminLoginComponent},
    {path: 'doctor-login', component: DoctorLoginComponent},
    {path: 'patient-login', component: PatientLoginComponent},
    {path: 'admin-dashboard', component: AdminDashboardComponent},
    {path: 'doctor-dashboard', component: DoctorDashboardComponent},
    {path: 'patient-dashboard', component: PatientDashboardComponent}
];

@NgModule({

    declarations: [
        
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes)],
        providers: [],
        
    exports: [RouterModule]
})
export class AppRoutingModule { }
