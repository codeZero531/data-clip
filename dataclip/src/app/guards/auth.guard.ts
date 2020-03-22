import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  states: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private flashMessage: FlashMessagesService
  ) {
  }

  canActivate(): boolean {

    this.states = this.authService.loggedIn();
    if (this.states) {
      console.log('user have');
      return true;
    } else {
      this.router.navigate(['/login']);
      this.flashMessage.show('please login first', {
        cssClass: 'alert-danger text-center' , timeout: 4000
      });
      console.log('user not have');
      return false;
    }



  }

}
