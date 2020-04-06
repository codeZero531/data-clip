import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MainService} from "../../services/main.service";

@Component({
  selector: 'app-slack',
  templateUrl: './slack.component.html',
  styleUrls: ['./slack.component.css']
})
export class SlackComponent implements OnInit {

  code: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private mainService: MainService,
  ) {

  }

  ngOnInit() {
    this.code = this.activatedRoute.snapshot.queryParamMap.get('code');
    this.mainService.getSlackUrl(this.code)
      .subscribe(
        res => {
          if (res.ok) {
            const data = res;
          }
        },
        error => console.log(error)
      );
  }

}
