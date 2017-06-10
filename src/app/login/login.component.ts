import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppRoutingModule, routedComponents } from '../app-routing.module';
import { AlertService, AuthenticationService, UserService } from '../_services/index';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    users: any = [];
 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private userService: UserService,
        private http: Http) { }
 
    ngOnInit() {
        // get return url from route parameters or default to '/dashboard'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        this.loadAllUsers();


    }
 
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
        .subscribe(
            data => {
                console.log(this.model.username);
                //this.router.navigate([this.returnUrl]);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
        

        // Retrieve posts from the API
        //this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }
    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { 
            this.users = users;
            console.log(this.users);
         });
    }
}