import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppRoutingModule, routedComponents } from '../app-routing.module';
import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    //styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
    isDashboard: any;
    currentUser: User;
    users: any = [];
 
    constructor(private userService: UserService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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
                //this.users = data;
                this.loadAllUsers();
            },
            error => {
                console.log(error);
        });
    }
 
    private loadAllUsers(): void  {
        this.userService.getAll().subscribe(
        data => {
            this.users = data;
            console.log(this.users);
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