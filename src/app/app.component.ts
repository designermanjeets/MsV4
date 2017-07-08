import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { AlertService, AuthenticationService } from '../app/_services/index';
import { Subscription } from 'rxjs/Subscription';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { WindowRef } from '../app/shared/WindowRef';



@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
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
export class AppComponent {
    subscription: Subscription;
    isDashboard :any;
    model: any = {};
    isMenuOpen : any;
    menuState:string = 'out';
    
    constructor( private authenticationService: AuthenticationService,
    private winRef: WindowRef    //console.log('Native window obj', winRef.nativeWindow); // getting the native window obj
    ) {
        if(localStorage.getItem('currentUser')){ 
          this.isDashboard=true 
        }

    }
    
    ngOnInit(){
         this.authenticationService.isDashboard.subscribe((isDashboard => this.isDashboard=isDashboard))
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

    
   
    
}
