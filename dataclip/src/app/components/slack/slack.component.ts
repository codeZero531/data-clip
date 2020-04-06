import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MainService} from "../../services/main.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {OtherService} from "../../services/other.service";

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
    private otherService: OtherService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {

  }

  ngOnInit() {
    this.code = this.activatedRoute.snapshot.queryParamMap.get('code');
    this.mainService.getSlackUrl(this.code)
      .subscribe(
        res => {
          if (res.ok) {
            this.sendData(res);
          } else {
            this.flashMessage.show('something went wrong. Try again!',{
              cssClass: 'alert-danger', timeout: 5000
            });
            console.log(res);
            this.router.navigate([this.otherService.prevRouter]);
          }
        },
        error => console.log(error)
      );
  }
  sendData(res: any) {
    const data = {
      url: res.incoming_webhook.url,
      team: res.team.name,
      channel: res.incoming_webhook.channel
    };
    this.mainService.sendSlackDetails(data)
      .subscribe(
        res => {
          this.flashMessage.show('slack webhook added successfully!',{
            cssClass: 'alert-success', timeout: 5000
          });
          this.router.navigate([this.otherService.prevRouter]);
        },
        error => {
          this.flashMessage.show( error.message+'something went wrong. Try again!',{
            cssClass: 'alert-danger', timeout: 5000
          });
          console.log(error);
          // this.router.navigate(['/site']);
        }
      );
  }

}
