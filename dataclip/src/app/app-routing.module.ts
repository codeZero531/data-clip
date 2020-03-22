

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


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LOGINComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'site', component: SiteComponent},
  {path: 'site/:name/:id', component: SidebarComponent, children: [
      {path: '', component: DashboardComponent},
      {path: 'code', component: CodeComponent},
      {path: 'create', component: CreateComponent},
      {path: 'settings', component: SettingsComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
