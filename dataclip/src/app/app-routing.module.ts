import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LOGINComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {SiteComponent} from "./components/site/site.component";
import {DashboardComponent} from "./components/site/dashboard/dashboard.component";
import {CreateComponent} from "./components/site/create/create.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LOGINComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'site', component: SiteComponent, children: [
      {path: ':name/:id', component: DashboardComponent},
      {path: 'create', component: CreateComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
