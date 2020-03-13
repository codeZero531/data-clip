import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/site/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { LOGINComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { SiteComponent } from './components/site/site.component';
import { DashboardComponent } from './components/site/dashboard/dashboard.component';
import {TokenInterceptorService} from "./services/token-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    LOGINComponent,
    SignupComponent,
    SiteComponent,
    DashboardComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
