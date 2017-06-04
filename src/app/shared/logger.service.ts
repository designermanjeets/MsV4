import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AuthenticationService } from '../_services/index';

@Injectable()

export class LoggerService {
    private isDashboard = false;
 
    constructor(private router: Router, private authenticationService: AuthenticationService) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.authenticationService.getAuthKey() || '') {
                     this.isDashboard = true;
                     console.log('isDashboard :: ' +this.isDashboard);
                } else {
                     this.isDashboard = false;
                     console.log('isDashboard :: ' +this.isDashboard);
                }
            }
        });
    }
}