import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AuthenticationService } from '../_services/index';


 
@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService
    ) { }
    
    getById(id: number) {
        // add authorization header with jwt token
        let headers = new Headers({ 'secret': 'longobnoxiouspassphrase ' , 'token' : this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.get('/getallusers' + id, options).map((response: Response) => response.json());
    }
 
    createUsers(user) {
        // add authorization header with jwt token
        let headers = new Headers({ 'secret': 'longobnoxiouspassphrase ' , 'token' : this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('/register', JSON.stringify(user), options).map((response: Response) => {
            return response.json()
        });
    }
 
    delete(_id: number) {
        // add authorization header with jwt token
        let headers = new Headers({ 'secret': 'longobnoxiouspassphrase ' , 'token' : this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });        
        return this.http.delete('/getallusers' + _id, options).map((response: Response) => {
            return response.json()
        });
    }

    getAll() {
        // add authorization header with jwt token
        let headers = new Headers({ 'secret': 'longobnoxiouspassphrase ' , 'token' : this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('/getallusers', options).map((response: Response) => {
            return response.json();
        });
    }

}