import { Component, OnInit, DoCheck, OnChanges, ElementRef, ViewChild, Input, EventEmitter } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { AlertService, AuthenticationService } from '../app/_services/index';
import { Subscription } from 'rxjs/Subscription';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { WindowRef } from '../app/shared/WindowRef';
import { Title, Meta }     from '@angular/platform-browser';
import { Subject } from "rxjs/Subject";
import { SiblingSharing } from '../app/shared/emitter.service';



@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.pug',
  //styleUrls: ['./app.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ])
  ]
})
export class AppComponent implements OnInit {
    @ViewChild('mainnav') elementView: ElementRef;

    subscription: Subscription;
    isDashboard; noShadow; isUserLogin; currentUser :any;
    model: any = {};
    isMenuOpen : any;
    menuState:string = 'out';
    navHeight: any;
    loading = false;
    
    constructor( private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private router: Router,
    private winRef: WindowRef,    //console.log('Native window obj', winRef.nativeWindow); // getting the native window obj
    private titleService: Title,
    private Meta:Meta,
    private elementRef:ElementRef,
    private siblingSharing: SiblingSharing
    ) {
        if(localStorage.getItem('currentUser')){ 
          this.isDashboard=true 
        }
    }
    
    ngOnInit(){
        this.authenticationService.isDashboard.subscribe((isDashboard => this.isDashboard = isDashboard));
        this.titleService.setTitle( 'Home, MsCreativePixel, AngularJS, Angular2/4, ReactJS, JavaScript' );
        this.Meta.addTag({ name: 'description', content: 'MsCreativePixel.com is a product development, design, and services firm creating mobile and web applications using JavaScript frameworks such as Angular 2, Angular 4 and React.' });
        this.Meta.addTag({ name: 'twitter:site', content: '@designermanjeet' });
        this.Meta.addTag({ name: 'og:title', content: 'Home, MsCreativePixel, AngularJS, Angular2/4, ReactJS, JavaScript' });

        this.navHeight = this.elementView.nativeElement.offsetHeight;
        this.siblingSharing.changeData(this.navHeight);
        this.siblingSharing.currentHomePage.subscribe(data => this.noShadow = data);
    }  

    ngDoCheck() {
      this.siblingSharing.currentUser.subscribe(data => this.isUserLogin = data);
    }

      toggleMenu(event) {
        if(this.winRef.nativeWindow.innerWidth < 768) {
          if (this.menuState === 'out'){
            this.menuState = 'in';
            document.getElementsByTagName('body')[0].classList.add("menu-opened"); //add the class
          } else {
            this.menuState = 'out';
            document.getElementsByTagName('body')[0].classList.remove("menu-opened"); //remove the class
          }
        }
      }
    

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
        .subscribe(
            data => {
                if(data ==true) {
                    this.siblingSharing.changeUser(this.isUserLogin = false);
                    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
                } else {
                    this.alertService.error("Credentials incorrect!");
                    this.loading = false;
                }
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }  

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
   
    
}
