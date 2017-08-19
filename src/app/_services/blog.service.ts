import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs/Observable';
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
         
    postSubmit(blog, author) {

        let body = { 
            postitle: blog.postitle,
            author:   author.username,
            article:  blog.article
        };
        
        
        return this.http.post('/thread', body).map((response: Response) => {

            this.isDashboard.next(true);
            return response.json();

        }).catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any

    }

    loadAllBlogPosts() {

        return this.http.post('/thread/getposts', Option).map((response: Response) => {
            return response.json();
        })//.catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any

    }
    

    postComment(cmmntfield, _id, author){

        let body = {
            comment     :   cmmntfield.poscomment,
            author      :   author.username,
            parentpost  :   _id
        };

        return this.http.post('/thread/postcomment', body).map((response: Response) => {
            return response.json(); 
        }).catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
        
    }
    
    //Load all comments on post detail 
    loadAllComments(_id): Observable<any>  { 

        let body = { parentpost: _id };

        return this.http.post('/thread/getcomments', body).map((response: Response) => {
            return response.json();
        }).catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any

    }
    
    // Get Post Detail
     getBlogDetail(_id) {

        return this.http.post('/thread/userSpecificPost'+ _id, Option).map((response: Response) => {
            return response.json();

        });
    }

    // Reply 
    postReply(cmmntfield, _id, author): Observable<any> {

        let body = {
            reply       :   cmmntfield.poscommentrep,
            author      :   author.username,
            parentpost  :   _id
        };
        
        return this.http.post('/postreply', body).map((response: Response) => {
            return response.json();
        }).catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any

    }
    
}