import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppRoutingModule, routedComponents } from '../app-routing.module';
import { UserService } from '../_services/index';
import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    //styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
    isDashboard: any;
    currentUser: any;
    users: any = [];
 
    constructor(private userService: UserService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
    ) {

        this.currentUser = JSON.parse(localStorage.getItem('currentUser')); // set token if saved in local storage

        if(this.currentUser){ 
            this.isDashboard=true 
        }

     }
 
    ngOnInit() {
        this.loadAllUsers();
    }
 
    deleteUser(_id: number) {
        this.userService.delete(_id)
        .subscribe(
            data => {
                this.loadAllUsers();
            },
            error => {
                console.log(error);
        });
    }
 
    private loadAllUsers(): void  {
        this.userService.getAll().subscribe(
        users => {
            this.users = users;
        },
        error => {
            console.log(error);
        });
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

}