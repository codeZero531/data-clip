// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/site/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { LOGINComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { SiteComponent } from './components/site/site.component';
import { DashboardComponent } from './components/site/dashboard/dashboard.component';
import {TokenInterceptorService} from "./services/token-interceptor.service";

import { DateAgoPipe } from './pipes/date-ago.pipe';
import {csvDownloader} from "./services/csv-downloader";
import { SettingsComponent } from './components/site/settings/settings.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {MatTabsModule} from "@angular/material/tabs";
import {MatDividerModule} from "@angular/material/divider";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {CodeComponent} from "./components/site/code/code.component";
import {FlashMessagesModule} from "angular2-flash-messages";
import {MatTableModule} from "@angular/material/table";
import {CreateComponent} from "./components/site/create/create.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountComponent } from './components/profile/account/account.component';
import { PaymentComponent } from './components/profile/payment/payment.component';
import { ApiComponent } from './components/site/api/api.component';
import { ConfirmMailComponent } from './components/confirm-mail/confirm-mail.component';
import { MaintenanceModeComponent } from './components/maintenance-mode/maintenance-mode.component';
import { IntergrationComponent } from './components/site/intergration/intergration.component';
import { DocComponent } from './components/doc/doc.component';
import { NewHomeComponent } from './components/new-home/new-home.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { FooterComponent } from './components/footer/footer.component';
import { SecondNavBarComponent } from './components/second-nav-bar/second-nav-bar.component';
import { SecurityComponent } from './components/security/security.component';
import { SlackComponent } from './components/slack/slack.component';
import { SlackViewComponent } from './components/site/intergration/slack-view/slack-view.component';

import {HashLocationStrategy, LocationStrategy} from "@angular/common";

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
    DateAgoPipe,
    csvDownloader,
    SettingsComponent,
    NavBarComponent,
    ProfileComponent,
    AccountComponent,
    PaymentComponent,
    ApiComponent,
    ConfirmMailComponent,
    MaintenanceModeComponent,
    IntergrationComponent,
    DocComponent,
    NewHomeComponent,
    PrivacyComponent,
    FooterComponent,
    SecondNavBarComponent,
    SecurityComponent,
    SlackComponent,
    SlackViewComponent,


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
    MatTableModule,
    MatProgressBarModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
