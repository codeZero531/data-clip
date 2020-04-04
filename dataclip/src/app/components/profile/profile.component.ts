import { Component, OnInit } from '@angular/core';
import {MainService} from "../../services/main.service";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
import {FormBuilder} from "@angular/forms";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor(
    private mainService: MainService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private fb: FormBuilder,
    private titleService: Title
  ) {
    this.titleService.setTitle('Profile - Dataclip');
    this.user = this.activatedRoute.snapshot.data['user'];
  }

  ngOnInit() {
    // this.authService.getUser()
    //   .subscribe(
    //   res => {
    //     this.user = res;
    //     console.log(res);
    //   }
    //   );
  }

}
