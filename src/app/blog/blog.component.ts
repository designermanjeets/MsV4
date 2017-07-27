import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppRoutingModule, routedComponents } from '../app-routing.module';
import { AlertService, AuthenticationService, UserService, BlogService } from '../_services/index';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Title, Meta }     from '@angular/platform-browser';
declare var $ :any;

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
    cmmntfield:any = {};
    commentslisting: any = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private BlogService: BlogService,
        private userService: UserService,
        private http: Http,
        private titleService: Title,
        private Meta:Meta         
        ){}
    
    ngOnInit() {
        this.loadAllBlogPosts();
        this.titleService.setTitle( 'Blog, MsCreativePixel, AngularJS, Angular2/4, ReactJS, JavaScript' );
        this.Meta.updateTag({ name: 'og:title', content: 'Blog, MsCreativePixel, AngularJS, Angular2/4, ReactJS, JavaScript' });
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
                this.bloglisting = data;
            },
            error => {
                console.log(error);
            });
    }

    blogDetail(_id:number){
        this.router.navigate(['/blogdetail', _id]);
    }



}