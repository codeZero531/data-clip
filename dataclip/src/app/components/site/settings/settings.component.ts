import { Component, OnInit } from '@angular/core';
import {MainService} from "../../../services/main.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FlashMessagesService} from "angular2-flash-messages";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  siteName: string;
  siteId: string;

  site: any;
  forms: any;
  siteUpdateForm: FormGroup;
  formName: string;
  formId: string;

  constructor(
    private mainService: MainService,
    private fb: FormBuilder,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title

  ) {
    this.titleService.setTitle('Site Settings - Dataclip');

    this.forms = this.activatedRoute.snapshot.data['data'];
    this.site = this.activatedRoute.snapshot.data['site'];
    console.log(this.site);
  }


  ngOnInit() {
    this.siteName = localStorage.getItem('siteName');
    this.siteId = localStorage.getItem('siteId');

    this.siteUpdateForm = this.fb.group({
      siteName: ['', Validators.required],
      host: ['', Validators.required],
      siteId: [this.siteId, Validators.required]
    });

    this.siteUpdateForm.get('host').setValue(this.site.host);
    this.siteUpdateForm.get('siteName').setValue(this.site.siteName);
  }

  loadSiteDetails() {
    this.mainService.getSiteDataFromId(this.siteId)
      .subscribe(
        res =>{
          this.site = res;
        },
        error => console.log(error)
      );
  }
  loadFormsDetails() {
    this.mainService.getForms(this.siteId)
      .subscribe(
        res =>{
          this.forms = res;
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
          this.loadSiteDetails();
        },
        error => {
          this.flashMessage.show(error.message, {cssClass: 'alert-danger text-center', timeout: 5000})

        }
      );
  }
  onFormDelete(id: string, name: string) {
    if(confirm("Are you sure to delete "+name+" ?")) {
      this.mainService.deleteFormFromId(id)
        .subscribe(
          res => {
            this.flashMessage.show(res.message, {cssClass: 'alert-success text-center', timeout: 5000});
            this.loadFormsDetails()
          },
          error => {
            this.flashMessage.show(error.message, {cssClass: 'alert-danger text-center', timeout: 5000});
          }
        );
    }
  }
  onFormEdit(id: string, name: string) {
    this.formName = name;
    this.formId = id;
  }

  onFormEditSubmit(name: string, id: string) {
    console.log(name);
    console.log(id);
    const data = {bucketId: id, bucketName: name};
    this.mainService.updateFormName(data)
      .subscribe(
        res => {
          this.flashMessage.show(res.message, {cssClass: 'alert-success text-center', timeout: 5000});
          this.loadFormsDetails();
        },
        error => {
          this.flashMessage.show(error.message, {cssClass: 'alert-danger text-center', timeout: 5000});
        }
      );
  }
  onDeleteSiteData(id: string) {
      this.mainService.deleteSiteData(id)
        .subscribe(
          res => {
            this.flashMessage.show(res.message, {cssClass: 'alert-success text-center', timeout: 5000});
            localStorage.removeItem('siteName');
            localStorage.removeItem('siteId');
            this.router.navigate(['site']);
          },
          error => {
            this.flashMessage.show(error.message, {cssClass: 'alert-danger text-center', timeout: 5000});
          }
        );
  }

}
