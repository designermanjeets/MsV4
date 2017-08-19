import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { AppRoutingModule, routedComponents } from '../app-routing.module';
import { AlertService, AuthenticationService, UserService } from '../_services/index';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Title, Meta }     from '@angular/platform-browser';
import { WindowRef } from '../shared/WindowRef'; 
import { SiblingSharing } from '../shared/emitter.service';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {
    navHeight; noShadow: any;
    myHeight : number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private userService: UserService,
        private http: Http,
        private titleService: Title,
        private Meta:Meta,
        private winRef: WindowRef,    //console.log(winRef.nativeWindow); // getting the native window obj
        private siblingSharing: SiblingSharing
    ) {
        this.siblingSharing.changeHomePage(this.noShadow = true);
     }

    ngOnInit(){
        this.titleService.setTitle( 'Home, MsCreativePixel, AngularJS, Angular2/4, ReactJS, JavaScript' );
        this.Meta.updateTag({ name: 'og:title', content: 'Home, MsCreativePixel, AngularJS, Angular2/4, ReactJS, JavaScript' });

        this.siblingSharing.currentData.subscribe(data => this.navHeight = data)
        this.myHeight = this.winRef.nativeWindow.innerHeight - this.navHeight;
    }
    
    ngOnDestroy(){
        this.siblingSharing.changeHomePage(this.noShadow = false);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.myHeight = this.winRef.nativeWindow.innerHeight - this.navHeight;
    }

}