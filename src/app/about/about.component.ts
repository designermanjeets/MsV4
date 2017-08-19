import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { AppRoutingModule, routedComponents } from '../app-routing.module';
import { AlertService, AuthenticationService, UserService } from '../_services/index';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Title, Meta }     from '@angular/platform-browser';

import { Subscription } from 'rxjs/Subscription';
import { SiblingSharing } from '../shared/emitter.service';

@Component({
    selector: 'app-root',
    templateUrl: 'about.component.html',
    styleUrls: ['./about.component.css']
})

export class AboutComponent {
    message; noShadow: any;
    subscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private userService: UserService,
        private http: Http,
        private titleService: Title,
        private Meta:Meta,
        private siblingSharing: SiblingSharing
    ) { }

    ngOnInit(){
        this.titleService.setTitle( 'About Us, MsCreativePixel, AngularJS, Angular2/4, ReactJS, JavaScript' );
        this.Meta.updateTag({ name: 'og:title', content: 'About Us, MsCreativePixel, AngularJS, Angular2/4, ReactJS, JavaScript' });
        
        this.siblingSharing.currentData.subscribe(data => this.noShadow = data)
    }
}