

import {HomeComponent} from "./components/home/home.component";
import {LOGINComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {SiteComponent} from "./components/site/site.component";
import {DashboardComponent} from "./components/site/dashboard/dashboard.component";
import {CreateComponent} from "./components/site/create/create.component";
import {CodeComponent} from "./components/site/code/code.component";
import {SidebarComponent} from "./components/site/sidebar/sidebar.component";
import {SettingsComponent} from "./components/site/settings/settings.component";
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from "./guards/auth.guard";
import {SiteSelectGuard} from "./guards/site-select.guard";
import {ProfileComponent} from "./components/profile/profile.component";
import {AccountComponent} from "./components/profile/account/account.component";
import {PaymentComponent} from "./components/profile/payment/payment.component";
import {ApiComponent} from "./components/site/api/api.component";
import {ConfirmMailComponent} from "./components/confirm-mail/confirm-mail.component";
import {GetUserResolverService} from "./resolver/get-user-resolver.service";
import {GetSiteDataResolverService} from "./resolver/get-site-data-resolver.service";
import {MaintenanceModeComponent} from "./components/maintenance-mode/maintenance-mode.component";
import {IntergrationComponent} from "./components/site/intergration/intergration.component";
import {IntegrationDataResolverService} from "./resolver/integration-data-resolver.service";
import {GetFormsResolverService} from "./resolver/get-forms-resolver.service";
import {GetSiteDataFormIdResolverService} from "./resolver/get-site-data-form-id-resolver.service";
import {DocComponent} from "./components/doc/doc.component";
import {NewHomeComponent} from "./components/new-home/new-home.component";
import {GetSiteApiTokenService} from "./resolver/get-site-api-token.service";
import {PrivacyComponent} from "./components/privacy/privacy.component";
import {SecurityComponent} from "./components/security/security.component";


const routes: Routes = [
  {path: '', component: NewHomeComponent},
  {path: 'confirm-account/:id/:code', component: ConfirmMailComponent},
  {path: 'login', component: LOGINComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'maintenance', component: MaintenanceModeComponent},
  {path: 'doc', component: DocComponent},
  {path: 'privacy', component: PrivacyComponent},
  {path: 'security', component: SecurityComponent},

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
      {path: 'code', component: CodeComponent, resolve: {user: GetUserResolverService}},
      {path: 'create', component: CreateComponent},
      {path: 'settings', component: SettingsComponent, resolve: {data: GetFormsResolverService, site: GetSiteDataFormIdResolverService}},
      {path: 'api', component: ApiComponent},
      {path: 'integrations', component: IntergrationComponent, resolve: {data: IntegrationDataResolverService}},
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
