import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppRoutingModule, routedComponents } from '../app-routing.module';
import { AlertService, AuthenticationService, UserService, BlogService } from '../_services/index';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import { EmitterService } from '../_services/emitter.service';

@Component({
    moduleId: module.id,
    templateUrl: 'blog.detail.component.html',
    styleUrls: ['./blog.component.css']
})

export class BlogDetailComponent implements OnInit, OnDestroy { 
    blogs:any = {};
    loading = false;
    isPosting:any;
    postListings:any;
    isPostingForm:any;
    bloglisting: any = [];
    cmmntfield:any = {};
    commentslisting: any = [];
    comments:any = {};
    doreply: boolean = false;
    replylisting: any = [];


    _id: number;
    private sub: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private BlogService: BlogService,
        private userService: UserService,
        private http: Http
    ){}
    
    
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let _id = params['_id'];
            this.getBlogDetails(_id);
            this.loadAllComments(_id);
        });
    }

    /*ngOnChanges() {  // Not Today
        EmitterService.get(this.commentslisting).subscribe(data => console.log(data));
    }*/

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    postComment(_id){
        this.BlogService.postComment(this.cmmntfield, _id )
        .subscribe(
            data => {
                let last_comment = data.comments[data.comments.length - 1];
                this.commentslisting.push(last_comment);
                this.cmmntfield.poscomment= ' '
                this.loadAllComments(_id);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }


    //Reply Area
    closeAllReplies(): void {
        this.commentslisting.forEach((comments) => {
            comments.doreply = false;
        });
    }

    doreplyfun(comments) {
        !comments.doreply && this.closeAllReplies();
        comments.doreply = !comments.doreply;
    }

    postReply(_id){
        this.BlogService.postReply(this.cmmntfield, _id )
        .subscribe(
            data => {
                 let parentcomment = data.comments.filter( x => x._id === _id);
                 let last_reply = parentcomment[0].replies[parentcomment[0].replies.length - 1];

                 for (let cmnts of this.commentslisting) {
                     if(cmnts._id ===_id) {
                         cmnts.replies.push(last_reply)
                     }
                }
                this.cmmntfield.poscommentrep= ' '
                // Emit edit event
                // EmitterService.get(_id).emit(data);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }

    loadAllComments(_id:number): void  {
        this.BlogService.loadAllComments(_id)
        .subscribe(
            data => {
                this.commentslisting = data[0].comments;
            },
            error => {
                console.log(error);
            });
    }

    private getBlogDetails(_id:number): void{
        this.BlogService.getBlogDetail(_id)
        .subscribe(
            data => {
                this.blogs = data;
            },
            error => {
                console.log(error);
            });
    }
}