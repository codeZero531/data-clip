import { Component, OnInit } from '@angular/core';
import {MainService} from "../../../services/main.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {OtherService} from "../../../services/other.service";

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

  activatedUrl: string;

  constructor(
    private mainService: MainService,
    private otherService: OtherService,
    private flashMessage: FlashMessagesService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private router: Router
  ) {
    this.titleService.setTitle('Site Integrations - Dataclip');

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
    this.otherService.prevRouter = this.router.url;

  }

  loadWebHook() {
    this.mainService.getWebhook(this.siteId)
      .subscribe(
        res => {
          this.data = res;
          if (this.data.status) {
            this.isWebhookCreated = true;
            this.webhookUrl = this.data.webhookUrl;
            this.webhookToken = this.data.webhookToken;
          } else {
            this.isWebhookCreated = false;
          }
        }

      );
  }

  onClickCreateWebHook() {
    const data = {webhookUrl: this.webhookUrl, siteId: this.siteId};
    this.mainService.setWebhook(data)
      .subscribe(
        res => {
          if (res.status){
            this.flashMessage.show(res.message, {cssClass: 'alert-success text-center', timeout: 5000});
            this.loadWebHook();
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
            this.loadWebHook();
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
    this.flashMessage.show('Copied to clipboard', {cssClass: 'alert-secondary', timeout: 3000})

  }

}
