import { Component } from '@angular/core';
import { AppComponent } from "../app.component";
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';




  


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AppComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
