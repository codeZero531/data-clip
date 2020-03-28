import { Component, OnInit } from '@angular/core';
import {MainService} from "../../../services/main.service";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-intergration',
  templateUrl: './intergration.component.html',
  styleUrls: ['./intergration.component.css']
})
export class IntergrationComponent implements OnInit {
  webhookUrl: string;
  isWebhookCreated = false;

  constructor(
    private mainService: MainService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.mainService.getWebhook()
      .subscribe(
        res => {
          if (res.status) {
            this.isWebhookCreated = true;
            this.webhookUrl = res.webhookUrl;
          } else {
            this.isWebhookCreated = false;
          }
        },
        error => console.log(error),
      );
  }

  onClickCreateWebHook() {
    const data = {webhookUrl: this.webhookUrl};
    this.mainService.setWebhook(data)
      .subscribe(
        res => {
          if (res.status){
            this.flashMessage.show(res.message, {cssClass: 'alert-success text-center', timeout: 5000});
            this.ngOnInit();
          } else {
            this.flashMessage.show(res.message, {cssClass: 'alert-danger text-center', timeout: 5000})
          }
        },
        error => {
          this.flashMessage.show(error.message, {cssClass: 'alert-danger text-center', timeout: 5000})

        }
      );
  }

  onClickRemoveWebhook(){
    this.mainService.deleteWebhook()
      .subscribe(
        res => {
          if (res){
            this.flashMessage.show('webhook delete successfully!', {cssClass: 'alert-success text-center', timeout: 5000});
            this.webhookUrl ='';
            this.ngOnInit();
          } else {
            this.flashMessage.show('something went wrong. Try again!', {cssClass: 'alert-danger text-center', timeout: 5000})
          }
        },
        error => {
          this.flashMessage.show('something went wrong. Try again!', {cssClass: 'alert-danger text-center', timeout: 5000})
        }
      );
  }

}
