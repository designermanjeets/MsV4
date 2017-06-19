import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppRoutingModule, routedComponents } from '../app-routing.module';
import { AlertService, AuthenticationService, UserService, BlogService } from '../_services/index';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Component({
    moduleId: module.id,
    templateUrl: 'blog.component.html',
    styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit { 
    blog:any = {};
    loading = false;
    isPosting:any;
    postListings:any;
    isPostingForm:any;
    bloglisting: any = [];
    comment:any = {};
    commentslisting: any = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private BlogService: BlogService,
        private userService: UserService,
        private http: Http){
        }
    
    ngOnInit() {
        this.loadAllBlogPosts();
        this.loadAllComments();
    }

    postSubmit(){
        this.BlogService.postSubmit(this.blog)
        .subscribe(
            data => {
                this.postListings = true;
                this.isPosting = false;
                //this.isPublish = false;
                this.bloglisting.push(data);
                this.loadAllBlogPosts();
                this.blog.postitle= null
                this.blog.article= ' '
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }

    private loadAllBlogPosts(): void  {
        this.BlogService.loadAllBlogPosts()
        .subscribe(
            data => {
                this.bloglisting = data[0].articles;
            },
            error => {
                console.log(error);
            });
    }


    postComment(){
        this.BlogService.postComment(this.comment)
        .subscribe(
            data => {
                this.commentslisting.push(data);
                this.loadAllComments();
                this.comment.poscomment= ' '
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }

    private loadAllComments(): void  {
        this.BlogService.loadAllComments()
        .subscribe(
            data => {
                this.commentslisting = data[0].comments;
                console.log(this.commentslisting);
            },
            error => {
                console.log(error);
            });
    }
}