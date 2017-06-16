import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable  } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from "rxjs/Subject";
import { UserService } from '../_services/index';

 
@Injectable()
export class BlogService {
    public isDashboard = new Subject<boolean>();
    blog: any = {};
    postings: any = [];

    constructor(private userService: UserService, private http: Http) {
        if(localStorage.getItem('currentUser')){ 
            this.isDashboard.next(true) 
        }
     }
 
    postSubmit(blog) {
        let headers = new Headers();
        var body = { 
            postitle: blog.postitle,
            author:   localStorage.getItem('currentUser'),
            article:  blog.article
        };
        headers.append('Content-Type', 'application/json'); // Set JSON header so that data is parsed by bodyParser on the backend
        return this.http.post('/thread', body, { headers: headers }).map((response: Response) => {
            response.json();            
            let blogpost = response.json();
            this.isDashboard.next(true);
            return blogpost;
        });
    }

    loadAllBlogPosts() {
        let headers = new Headers();
        var body = { 
            username: localStorage.getItem('currentUser')
        };
        headers.append('Content-Type', 'application/json');
        return this.http.post('/thread/getposts', body, { headers: headers }).map((response: Response) => {
            return response.json();
        });
    }
}