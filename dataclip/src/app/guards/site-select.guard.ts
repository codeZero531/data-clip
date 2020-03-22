import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {MainService} from "../services/main.service";

@Injectable({
  providedIn: 'root'
})
export class SiteSelectGuard implements CanActivate {
  states: boolean;

  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService,
    private mainService: MainService
  ) {
  }
  canActivate(): boolean {

    this.states = this.mainService.isSiteSelected();
    if (this.states) {
      console.log('site selected');
      return true;
    } else {
      this.router.navigate(['site']);
      this.flashMessage.show('please select site', {
        cssClass: 'alert-danger text-center' , timeout: 4000
      });
      console.log('site not selected');
      return false;
    }



  }



}
