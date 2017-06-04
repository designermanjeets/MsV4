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
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    isDashboard: any;
    subscription: Subscription;
    model: any = {};
    
    constructor(
          private authenticationService: AuthenticationService,
          private alertService: AlertService,
          private loggerService: LoggerService
        ) { }

    ngOnInit(){
        if(this.authenticationService.getAuthKey() || ''){ this.isDashboard = true; } 
        else { this.isDashboard = false }
        //console.log('app.component.html '+this.isDashboard)
      }
   
    
}
