import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from "rxjs/Subject";
import { UserService } from '../_services/index';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AuthenticationService } from '../_services/index';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


 
@Injectable()
export class BlogService {
    public isDashboard = new Subject<boolean>();
    blog: any = {};
    postings: any = [];
    currentUser:any;

    constructor(
        private userService: UserService, 
        private http: Http,
        private authenticationService: AuthenticationService
        ){
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if(this.currentUser){ 
                this.isDashboard.next(true); 
            }
        }
 
    postSubmit(blog) {

        let body = { 
            postitle: blog.postitle,
            author:   this.currentUser.username,
            article:  blog.article
        };
        
        // add authorization header with jwt token
        //let headers = new Headers({ 'secret': 'longobnoxiouspassphrase ' , 'token' : this.authenticationService.token });
        let options = new RequestOptions({  body: body });  
        
        return this.http.post('/thread', options).map((response: Response) => {
                        
            //let blogpost = response.json();
            this.isDashboard.next(true);
            return response.json();
        }).catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    loadAllBlogPosts() {

        let body = { author: this.currentUser.username };
        // add authorization header with jwt token
        //let headers = new Headers({ 'secret': 'longobnoxiouspassphrase ' , 'token' : this.authenticationService.token });
        let options = new RequestOptions({ body: body });

        return this.http.post('/thread/getposts', options).map((response: Response) => {
            return response.json();
        }).catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }
    

    postComment(cmmntfield, _id){

        let body = {
            comment     :   cmmntfield.poscomment,
            author      :   this.currentUser.username,
            parentpost  :   _id
        };

        // add authorization header with jwt token
        let headers = new Headers({ 'secret': 'longobnoxiouspassphrase ' , 'token' : this.authenticationService.token });
        let options = new RequestOptions({ headers: headers, body: body });

        return this.http.post('/thread/postcomment', options).map((response: Response) => {
            return response.json();            
            //let commentpost = response.json();
            //return commentpost;
        }).catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }
    
    //Load all comments on post detail 
    loadAllComments(_id): Observable<any>  { 

        let body = { parentpost: _id };

        // add authorization header with jwt token
        let headers = new Headers({ 'secret': 'longobnoxiouspassphrase ' , 'token' : this.authenticationService.token });
        let options = new RequestOptions({ headers: headers, body: body });

        return this.http.post('/thread/getcomments', options).map((response: Response) => {
            return response.json();
        }).catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }
    
    // Get Post Detail
     getBlogDetail(_id) {
         
        let body = { author: this.currentUser.username };

        // add authorization header with jwt token
        let headers = new Headers({ 'secret': 'longobnoxiouspassphrase ' , 'token' : this.authenticationService.token });
        let options = new RequestOptions({ headers: headers, body: body });

        return this.http.post('/thread/userSpecificPost'+ _id, options).map((response: Response) => {
            return response.json();
        });
    }

    // Reply 
    postReply(cmmntfield, _id): Observable<any> {

        let body = {
            reply       :   cmmntfield.poscommentrep,
            author      :   this.currentUser.username,
            parentpost  :   _id
        };

        // add authorization header with jwt token
        let headers = new Headers({ 'secret': 'longobnoxiouspassphrase ' , 'token' : this.authenticationService.token });
        let options = new RequestOptions({ headers: headers, body: body });

        return this.http.post('/postreply', options).map((response: Response) => {
            return response.json();
        }).catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }
    
}