import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { Router, RouterOutlet } from "@angular/router";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
