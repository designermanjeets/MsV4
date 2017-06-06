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
    users: User[] = [];
 
    constructor(private userService: UserService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
     }
 
    ngOnInit() {
        this.loadAllUsers();
    }
 
    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }
 
    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

}