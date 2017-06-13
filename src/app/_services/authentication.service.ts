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
        var body = { 
            'username':username, 
            'password':password 
        };
        let headers = new Headers();
        headers.append('Content-Type', 'application/json'); // Set JSON header so that data is parsed by bodyParser on the backend
        return this.http.post('https://api.mlab.com/api/1/databases/mscreativepixel_db/collections/blogusers?apiKey=llVv4EjeMKIq2vUaO7SSd3Fb3sh3eg2k',JSON.stringify({ username: username, password: password }), { headers: headers }).map((response: Response) => {
            response.json();            
            let user = response.json();
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.isDashboard.next(true);
            return user;
            
        });
    }
 
    logout() {
        this.isDashboard.next(false);
        return localStorage.removeItem('currentUser');
    }
}