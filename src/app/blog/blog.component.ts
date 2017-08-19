import { Component, OnInit, DoCheck, EventEmitter, Output, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppRoutingModule, routedComponents } from '../app-routing.module';
import { AlertService, AuthenticationService, UserService, BlogService } from '../_services/index';
import { SiblingSharing } from '../shared/emitter.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Title, Meta } from '@angular/platform-browser';
declare var $ :any;

@Component({
    moduleId: module.id,
    templateUrl: 'blog.component.pug',
    styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit {

    model: any = {};
    blog:any = {};  
    loading = false;
    isPosting:any;
    postListings; isPostingForm; currentUser; isUserLogin :any;
    bloglisting: any = [];
    cmmntfield:any = {};
    commentslisting: any = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private BlogService: BlogService,
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private http: Http,
        private titleService: Title,
        private Meta:Meta,   
        private siblingSharing: SiblingSharing
        ){}
    
    ngOnInit() {
        this.loadAllBlogPosts();
        this.titleService.setTitle( 'Blog, MsCreativePixel, AngularJS, Angular2/4, ReactJS, JavaScript' );
        this.Meta.updateTag({ name: 'og:title', content: 'Blog, MsCreativePixel, AngularJS, Angular2/4, ReactJS, JavaScript' });
    }

    ngDoCheck(){
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    }

    public options: Object = {
        charCounterCount: true,
        htmlUntouched: true,
        htmlRemoveTags: [ ],
        heightMin : 250,
        fileUploadURL: 'http://mscreativepixel.com/dist/assets',
        imageUploadURL: 'http://mscreativepixel.com/dist/assets',
        imageManagerLoadURL: 'http://mscreativepixel.com/dist/assets',
        videoUploadURL: 'http://mscreativepixel.com/dist/assets'
    };

    createNewPost(){
        if(this.currentUser){
            this.isPostingForm = true
        } else {
            this.siblingSharing.changeUser(this.isUserLogin = true);
        }
    }

    postSubmit(){
        this.BlogService.postSubmit(this.blog, this.currentUser)
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
                this.bloglisting = data;
            },
            error => {
                console.log(error);
            });
    }

    blogDetail(blogs){
        this.router.navigate(['/blogdetail', blogs._id ,{ title: blogs.postitle}]);
    }



}