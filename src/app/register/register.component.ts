import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppRoutingModule, routedComponents } from '../app-routing.module';
import { AlertService, UserService } from '../_services/index';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})
 
export class RegisterComponent {
    model: any = {};
    loading = false;
    users: any = [];
 
    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private http: Http) { }
 
    register() {
        this.loading = true;
        this.userService.createUsers(this.model)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }



}