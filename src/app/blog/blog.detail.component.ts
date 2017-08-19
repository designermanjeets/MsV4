import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppRoutingModule, routedComponents } from '../app-routing.module';
import { AlertService, AuthenticationService, UserService, BlogService } from '../_services/index';
import { SiblingSharing } from '../shared/emitter.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import { EmitterService } from '../_services/emitter.service';
import { Title, Meta }     from '@angular/platform-browser';

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
    currentUser:any;
    
    private sub: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private BlogService: BlogService,
        private userService: UserService,
        private siblingSharing: SiblingSharing,
        private http: Http,
        private titleService: Title,
        private Meta:Meta 
    ){}
    
    
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let _id = params['_id'];
            let mofo = params['title'];
            this.getBlogDetails(_id);
            this.loadAllComments(_id);
        });
        this.titleService.setTitle( 'Blog Detail, MsCreativePixel, AngularJS, Angular2/4, ReactJS, JavaScript' );
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
    }

    ngDoCheck(){
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    }

    isUserLogged(){
        if(!this.currentUser){
            console.log('Chutiya Sala!');
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    postComment(_id){
        this.BlogService.postComment(this.cmmntfield, _id, this.currentUser )
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
        this.BlogService.postReply(this.cmmntfield, _id, this.currentUser )
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
                this.router.navigate(['/blog']);
            });
    }

    private getBlogDetails(_id:number): void{
        this.BlogService.getBlogDetail(_id)
        .subscribe(
            data => {
                this.Meta.updateTag({ name: 'og:title', content: data.postitle + ', Blog Detail, MsCreativePixel, AngularJS, Angular2/4, ReactJS, JavaScript' });
                this.blogs = data;
            },
            error => {
                console.log(error);
            });
    }
}