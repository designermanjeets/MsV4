import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable  } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from "rxjs/Subject";

 
@Injectable()
export class AuthenticationService {

    public isDashboard = new Subject<boolean>();
    public token: string;

    constructor(private http: Http) {

        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;

        currentUser && this.isDashboard.next(true);
     }
 
    login(username: string, password: string) {
        var body = { 
            'username':username, 
            'password':password 
        };
        return this.http.post('/authenticate', body).map((response: Response) => {
            
            // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                    this.isDashboard.next(true);
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            
        });
    }
 
    logout() {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.isDashboard.next(false);
        localStorage.removeItem('currentUser');
    }
}