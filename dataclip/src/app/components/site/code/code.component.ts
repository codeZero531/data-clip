import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {log} from "util";
import {MainService} from "../../../services/main.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {
  text = "<form action='https://dataclip.tech/api/5sda45sd4asd5sadasd/Ysd4asjI'></form>";
  siteName: any;
  siteId: any;
  forms: any;
  bucketId: any;

  userId: any;
  user: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private mainService: MainService,
    private authService: AuthService,
  ) {
    this.user = this.activatedRoute.snapshot.data['user'];
    this.userId = this.user._id;
    // this.authService.getUser().subscribe(res => this.userId = res._id);
  }

  ngOnInit() {
    this.siteName = localStorage.getItem('siteName');
    this.siteId = localStorage.getItem('siteId');
    this.mainService.getForms(this.siteId)
      .subscribe(
        res => {this.forms = res; console.log(this.forms)},
        error => console.log(error)
      );
  }

}
