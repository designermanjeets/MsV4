import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppRoutingModule, routedComponents } from '../app-routing.module';
import { AlertService, AuthenticationService, UserService } from '../_services/index';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    users: any;
    currentUser:any;
 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private userService: UserService,
        private http: Http) { }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }
 
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
        .subscribe(
            data => {
                if(data ==true) {
                    this.router.navigate(['/dashboard']);
                } else {
                    this.alertService.error("Tusi fuddu ho");
                    this.loading = false;
                }
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }
}