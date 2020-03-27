

import {HomeComponent} from "./components/home/home.component";
import {LOGINComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {SiteComponent} from "./components/site/site.component";
import {DashboardComponent} from "./components/site/dashboard/dashboard.component";
import {CreateComponent} from "./components/site/create/create.component";
import {CodeComponent} from "./components/site/code/code.component";
import {SidebarComponent} from "./components/site/sidebar/sidebar.component";
import {SettingsComponent} from "./components/site/settings/settings.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AuthGuard} from "./guards/auth.guard";
import {SiteSelectGuard} from "./guards/site-select.guard";
import {ProfileComponent} from "./components/profile/profile.component";
import {AccountComponent} from "./components/profile/account/account.component";
import {PaymentComponent} from "./components/profile/payment/payment.component";
import {ApiComponent} from "./components/site/api/api.component";
import {ConfirmMailComponent} from "./components/confirm-mail/confirm-mail.component";
import {GetUserResolverService} from "./services/get-user-resolver.service";
import {GetSiteDataResolverService} from "./services/get-site-data-resolver.service";
import {MaintenanceModeComponent} from "./components/maintenance-mode/maintenance-mode.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'confirm-account/:id/:code', component: ConfirmMailComponent},
  {path: 'login', component: LOGINComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'maintenance ', component: MaintenanceModeComponent},

  {
    path: 'site',
    canActivate: [AuthGuard],
    component: SidebarComponent,
    resolve: {user: GetUserResolverService},
    children: [
      {path: '', component: SiteComponent}
    ]},

  {path: 'site/:name/:id', component: SidebarComponent, resolve: {user: GetUserResolverService},canActivate: [AuthGuard, SiteSelectGuard],children: [
      {path: '', component: DashboardComponent, resolve: {data: GetSiteDataResolverService}},
      {path: 'code', component: CodeComponent},
      {path: 'create', component: CreateComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'api', component: ApiComponent},
    ]},
  {path: 'profile', component: ProfileComponent,resolve: {user: GetUserResolverService}, children: [
      {path: 'settings', component: AccountComponent, resolve: {user: GetUserResolverService},},
      {path: 'payment', component: PaymentComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
