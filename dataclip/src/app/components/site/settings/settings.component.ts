import { Component, OnInit } from '@angular/core';
import {MainService} from "../../../services/main.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  siteName: string;
  siteId: string;

  site: any;
  siteUpdateForm: FormGroup;

  constructor(
    private mainService: MainService,
    private fb: FormBuilder,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.siteName = localStorage.getItem('siteName');
    this.siteId = localStorage.getItem('siteId');

    this.siteUpdateForm = this.fb.group({
      siteName: ['', Validators.required],
      host: ['', Validators.required],
      siteId: [this.siteId, Validators.required]
    });

    this.mainService.getSiteDataFromId(this.siteId)
      .subscribe(
        res =>{
          this.site = res;
          this.siteUpdateForm.get('host').setValue(this.site.host)
          this.siteUpdateForm.get('siteName').setValue(this.site.siteName)
        },
        error => console.log(error)
      );


  }
  onUpdate() {
    console.log(this.siteUpdateForm.value);
    this.mainService.sitDetailsUpdate(this.siteUpdateForm.value)
      .subscribe(
        res => {
          this.flashMessage.show(res.message, {cssClass: 'alert-success text-center', timeout: 5000})
        },
        error => {
          this.flashMessage.show(error.message, {cssClass: 'alert-danger text-center', timeout: 5000})

        }
      );
  }

}
