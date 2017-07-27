import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { AppRoutingModule, routedComponents } from '../app-routing.module';
import { AlertService, AuthenticationService, UserService } from '../_services/index';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Title, Meta }     from '@angular/platform-browser';

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
        private http: Http,
        private titleService: Title,
        private Meta:Meta
    ) { }

    ngOnInit(){
        this.titleService.setTitle( 'Home, MsCreativePixel, AngularJS, Angular2/4, ReactJS, JavaScript' );
        this.Meta.updateTag({ name: 'og:title', content: 'Home, MsCreativePixel, AngularJS, Angular2/4, ReactJS, JavaScript' });
    }

}