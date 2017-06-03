import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule, routedComponents } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    routedComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],  
  bootstrap: [AppComponent]
})
export class AppModule { }
