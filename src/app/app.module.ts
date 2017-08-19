import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';

import { FormsModule }    from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// used to create fake backend
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent } from './app.component';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, BlogService } from './_services/index';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog/blog.detail.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TruncatePipe }   from './shared/truncate';
import { WindowRef } from './shared/WindowRef';
import { SanitizeHtml } from './shared/sanitizer';
import { SiblingSharing } from './shared/emitter.service';
import { AppRoutingModule, routedComponents } from './app-routing.module';

// Import Angular plugin for Editor.
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
// import { InterceptedHttp } from './shared/mshttp.service'; // Not Today || 20170723
import { httpFactory } from "./shared/httpFactory";


enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    BlogComponent,
    BlogDetailComponent,
    routedComponents,
    RegisterComponent,
    DashboardComponent,
    TruncatePipe,
    SanitizeHtml
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot() // Editor
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    BlogService,
    MockBackend,
    BaseRequestOptions,
    WindowRef,
    SanitizeHtml,
    Title,
    SiblingSharing,
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    }
  ],
  exports: [
    
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
