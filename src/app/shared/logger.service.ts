import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AuthenticationService } from '../_services/index';

@Injectable()

export class LoggerService {
    private myVar = false;
 
    constructor(private router: Router, private authenticationService: AuthenticationService) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.authenticationService.getAuthKey() || '') {
                     console.log(this.authenticationService.getAuthKey());
                } else {
                     console.log(this.authenticationService.getAuthKey());
                }
            }
        });
    }
}