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
 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private userService: UserService,
        private http: Http) { }
 
    ngOnInit() {
        // get return url from route parameters or default to '/dashboard'
        localStorage.getItem('currentUser');
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        //this.loadAllUsers();


    }
 
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
        .subscribe(
            data => {
                //console.log(data.status);
                if(data.status=="msv4-accepted") {
                    localStorage.setItem('currentUser', JSON.stringify(data.username));
                    this.router.navigate([this.returnUrl]);
                }
                if (data.status=="msv4-rejected"){
                    this.alertService.error("Tusi fuddu ho");
                    this.loading = false;
                }
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }

    private loadAllUsers() {
        this.userService.getAll()
        .subscribe(
            data => {
                console.log(data);
            },
            error => {
                console.log(error);
            });
    }
}