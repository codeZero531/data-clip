import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-second-nav-bar',
  templateUrl: './second-nav-bar.component.html',
  styleUrls: ['./second-nav-bar.component.css']
})
export class SecondNavBarComponent implements OnInit {
  isLogin: boolean;

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.isLogin = this.authService.loggedIn();
  }
}
