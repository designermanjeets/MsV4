import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable  } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from "rxjs/Subject";
import { UserService } from '../_services/index';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

 
@Injectable()
export class BlogService {
    public isDashboard = new Subject<boolean>();
    blog: any = {};
    postings: any = [];
    currentUser:any;

    constructor(private userService: UserService, private http: Http) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(this.currentUser){ 
            this.isDashboard.next(true); 
        }
     }
 
    postSubmit(blog) {
        var body = { 
            postitle: blog.postitle,
            author:   this.currentUser.username,
            article:  blog.article
        };
        
        return this.http.post('/thread', body).map((response: Response) => {
            response.json();            
            let blogpost = response.json();
            this.isDashboard.next(true);
            return blogpost;
        });
    }

    loadAllBlogPosts() {
        var body = { author: this.currentUser.username };

        return this.http.post('/thread/getposts', body).map((response: Response) => {
            return response.json();
        });
    }
    

    postComment(cmmntfield, _id){
        var body = {
            comment     :   cmmntfield.poscomment,
            author      :   this.currentUser.username,
            parentpost  :   _id
        };
        return this.http.post('/thread/postcomment', body).map((response: Response) => {
            response.json();            
            let commentpost = response.json();
            return commentpost;
        });
    }
    
    //Load all comments on post detail 
    loadAllComments(_id): Observable<any>  {
        
        let headers = new Headers();
        headers.append('Content-Type', 'application/json'); // Set JSON header so that data is parsed by bodyParser on the backend

        var body = { parentpost: _id };

        return this.http.post('/thread/getcomments', body , { headers: headers }).map((response: Response) => {
            return response.json();
        });
    }
    
    // Get Post Detail
     getBlogDetail(_id) {
        var body = { author: this.currentUser.username };

        return this.http.post('/thread/userSpecificPost'+ _id, body).map((response: Response) => {
            return response.json();
        });
    }

    // Reply 
    postReply(cmmntfield, _id): Observable<any> {
        var body = {
            reply       :   cmmntfield.poscommentrep,
            author      :   this.currentUser.username,
            parentpost  :   _id
        };

        return this.http.post('/postreply', body).map((response: Response) => {
            response.json();            
            let commentpost = response.json();
            return commentpost;
        });
    }
    
}