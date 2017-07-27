import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { AppRoutingModule, routedComponents } from '../app-routing.module';
import { AlertService, AuthenticationService, UserService } from '../_services/index';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Title, Meta }     from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: 'about.component.html',
    styleUrls: ['./about.component.css']
})

export class AboutComponent {
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
        this.titleService.setTitle( 'About Us, MsCreativePixel, AngularJS, Angular2/4, ReactJS, JavaScript' );
        this.Meta.updateTag({ name: 'og:title', content: 'About Us, MsCreativePixel, AngularJS, Angular2/4, ReactJS, JavaScript' });
    }
}