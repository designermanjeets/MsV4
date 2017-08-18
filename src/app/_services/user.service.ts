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
        return this.http.get('/getallusers' + id).map((response: Response) => response.json());
    }
 
    createUsers(user) {
        
        return this.http.post('/register', user).map((response: Response) => {
            return response.json()
        });
    }
 
    delete(_id: number) {      
        return this.http.delete('/getallusers' + _id).map((response: Response) => {
            return response.json()
        });
    }

    getAll() {

        let headers = new Headers({ token: this.authenticationService.token })
        let options = new RequestOptions({ headers: headers });
        
        return this.http.post('/getallusers', options).map((response: Response) => {
            return response.json();
        });
    }

}