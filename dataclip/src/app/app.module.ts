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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatChipsModule} from "@angular/material/chips";
import { CreateComponent } from './components/site/create/create.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatDividerModule} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {FlashMessagesModule} from "angular2-flash-messages";
import { CodeComponent } from './components/site/code/code.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    LOGINComponent,
    SignupComponent,
    SiteComponent,
    DashboardComponent,
    CreateComponent,
    CodeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatChipsModule,
    MatTabsModule,
    MatDividerModule,
    MatCardModule,
    MatSnackBarModule,
    FlashMessagesModule.forRoot(),
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
