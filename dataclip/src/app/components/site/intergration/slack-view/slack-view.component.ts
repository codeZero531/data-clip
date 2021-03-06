import { Component, OnInit } from '@angular/core';
import {MainService} from "../../../../services/main.service";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-slack-view',
  templateUrl: './slack-view.component.html',
  styleUrls: ['./slack-view.component.css']
})
export class SlackViewComponent implements OnInit {
  isHaveSlack = false;
  slackDetails: any;

  constructor(
    private mainService: MainService,
    private flashMessage: FlashMessagesService
  ) {

  }

  ngOnInit() {
    this.mainService.getSlackDetails()
      .subscribe(
        res => {
          if (res.status && res.data) {
            this.slackDetails = res.data;
            this.isHaveSlack = true
          } else {
            this.isHaveSlack = false;
          }
        },
        error => {
          this.flashMessage.show('something went wrong. Please reload page!', {cssClass: 'alert-danger text-center', timeout: 5000});

        }
      );
  }
  onClickRemoveSlack() {
    this.mainService.deleteSlack()
      .subscribe(
        res => {
          if (res){
            this.flashMessage.show('slack integration delete successfully!', {cssClass: 'alert-success text-center', timeout: 5000});
            this.ngOnInit();
          } else {
            this.flashMessage.show('something went wrong. Try again!', {cssClass: 'alert-danger text-center', timeout: 5000});
            this.ngOnInit();
          }
        },
        error => {
          this.flashMessage.show('something went wrong. Try again!', {cssClass: 'alert-danger text-center', timeout: 5000})
        }
      );
  }
  clickOnSendTestItem(){
    this.mainService.sendTestItemSlack()
      .subscribe(
        res => {
          if (res.status) {
            this.flashMessage.show('test item send!', {cssClass: 'alert-success text-center', timeout: 3000});

          } else{
            this.flashMessage.show('send fail. Try again!', {cssClass: 'alert-danger text-center', timeout: 3000});

          }
        },
        error => {
          this.flashMessage.show('send fail. Try again', {cssClass: 'alert-danger text-center', timeout: 3000});
          console.log(error);
        }
      );
  }

}
