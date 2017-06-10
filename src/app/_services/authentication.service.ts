import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable  } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from "rxjs/Subject";

 
@Injectable()
export class AuthenticationService {
    public isDashboard = new Subject<boolean>();
    constructor(private http: Http) {
        if(localStorage.getItem('currentUser')){ 
            this.isDashboard.next(true) 
        }
     }
 
    login(username: string, password: string) {
        return this.http.get('/blogusers').map((response: Response) => {
            response.json();
            let user = response.json();
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.isDashboard.next(true);
        });
    }
 
    logout() {
        this.isDashboard.next(false);
        return localStorage.removeItem('currentUser');
    }
}