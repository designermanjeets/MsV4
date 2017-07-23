import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppRoutingModule, routedComponents } from '../app-routing.module';
import { AlertService, AuthenticationService, UserService } from '../_services/index';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent { 

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private userService: UserService,
        private http: Http) { }

    ngOnInit(){
        
    }

}