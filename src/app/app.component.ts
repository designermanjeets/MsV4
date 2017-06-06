import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { AlertService, AuthenticationService } from '../app/_services/index';
import { LoggerService } from '../app/shared/logger.service';
import { Subscription } from 'rxjs/Subscription';



@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css'],
})
export class AppComponent {
    subscription: Subscription;
    isDashboard :any;
    model: any = {};
    
    constructor(
          private authenticationService: AuthenticationService
        ) {
          //this.authenticationService.isDashboard.subscribe((isDashboard => this.isDashboard=isDashboard))
    }
    ngOnInit(){
         this.authenticationService.isDashboard.subscribe((isDashboard => this.isDashboard=isDashboard))
    }
   
    
}
