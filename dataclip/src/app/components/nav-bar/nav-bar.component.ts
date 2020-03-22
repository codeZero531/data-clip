import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isLogin: boolean;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isLogin = this.authService.loggedIn();
  }

}
