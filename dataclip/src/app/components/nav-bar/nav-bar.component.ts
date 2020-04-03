import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit  {
  isLogin: boolean;
  user: any;

  constructor(
    private authService: AuthService,

  ) { }

  ngOnInit() {
    this.isLogin = this.authService.loggedIn();
   if (this.isLogin) {
     this.authService.getUser()
       .subscribe(res => this.user = res);
   }
  }
  onPressLogout() {
    this.authService.logout();
  }


}
