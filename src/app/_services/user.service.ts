import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
import { User } from '../_models/index';
 
@Injectable()
export class UserService {
    constructor(private http: Http) { }
    
    getById(id: number) {
        return this.http.get('/blogusers' + id).map((response: Response) => response.json());
    }
 
    createUsers(user: User) {
         let headers = new Headers();
        headers.append('Content-Type', 'application/json'); // Set JSON header so that data is parsed by bodyParser on the backend
        return this.http.post('/blogusers/user', JSON.stringify(user), { headers: headers }).map((response: Response) => {
            return response.json()
        });
    }
 
    update(user: User) {
        return this.http.put('/blogusers' + user.id, user).map((response: Response) => response.json());
    }
 
    delete(_id: number) {
        return this.http.delete('/blogusers' + _id).map((response: Response) => {
            return response.json()
        });
    }

    getAll() {
        return this.http.get('/blogusers').map((response: Response) => {
            return response.json();
        });
    }
 
    // private helper methods
 
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }

}