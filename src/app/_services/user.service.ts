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
        let headers = new Headers();
        headers.append('Content-Type', 'application/json'); // Set JSON header so that data is parsed by bodyParser on the backend
        return this.http.post('/register', JSON.stringify(user), { headers: headers }).map((response: Response) => {
            return response.json()
        });
    }
 
    update(user) {
        return this.http.put('/blogusers' + user.id, user).map((response: Response) => response.json());
    }
 
    delete(_id: number) {
        return this.http.delete('/getallusers' + _id).map((response: Response) => {
            return response.json()
        });
    }

    getAll() {
        // add authorization header with jwt token
        let headers = new Headers({ 'secret': 'longobnoxiouspassphrase ' + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('/getallusers', options).map((response: Response) => {
            return response.json();
        });
    }

}