import { Component, OnInit } from '@angular/core';
import {MainService} from "../../../services/main.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-intergration',
  templateUrl: './intergration.component.html',
  styleUrls: ['./intergration.component.css']
})
export class IntergrationComponent implements OnInit {
  webhookUrl: string;
  isWebhookCreated = false;
  webhookToken: string;
  siteId: string;
  siteName: string;
  data: any;

  constructor(
    private mainService: MainService,
    private flashMessage: FlashMessagesService,
    private activatedRoute: ActivatedRoute
  ) {
    this.data = this.activatedRoute.snapshot.data['data'];
    console.log(this.data);
    if (this.data.status) {
      this.isWebhookCreated = true;
      this.webhookUrl = this.data.webhookUrl;
      this.webhookToken = this.data.webhookToken;
    } else {
      this.isWebhookCreated = false;
    }
  }

  ngOnInit() {
    this.siteId = localStorage.getItem('siteId');
    this.siteName = localStorage.getItem('siteName');
  }

  onClickCreateWebHook() {
    const data = {webhookUrl: this.webhookUrl, siteId: this.siteId};
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
    this.mainService.deleteWebhook(this.siteId)
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
  /* To copy Text from Textbox */
  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

}
