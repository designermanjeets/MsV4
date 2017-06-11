import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
import { User } from '../_models/index';
 
@Injectable()
export class UserService {
    constructor(private http: Http) { }
 
    // getAll() {
    //     return this.http.get('/blogusers').map((response: Response) => response.json());
    // }
 
    getById(id: number) {
        return this.http.get('/blogusers' + id).map((response: Response) => response.json());
    }
 
    createUsers(user: User) {
        return this.http.post('/blogusers', user).map((response: Response) => response.json());
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