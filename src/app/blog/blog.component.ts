import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'blog.component.html',
    styleUrls: ['./blog.component.css']
})

export class BlogComponent { 
    blog:any = {};
    blogpost =[];

    constructor(){}
    
    postSubmit(){
        this.blogpost.push(this.blog.postitle);
        console.log(this.blogpost);
    }
}