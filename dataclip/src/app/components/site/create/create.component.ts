import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../../../services/main.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  siteForm: FormGroup;
  sites: any;
  forms: any;

  constructor(
    private fb: FormBuilder,
    private mainService: MainService,
    private _snackBar: MatSnackBar,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.siteForm = this.fb.group({
      siteName: ['', Validators.required],
      hostName: ['', Validators.required],
    });
    this.mainService.getSites()
      .subscribe(
        res => {
          this.sites = res;
          console.log(res);
        },
        error => console.log(error)
      );

  }

  onSubmit() {
    this.mainService.createSite(this.siteForm.value)
      .subscribe(
        res => {
           this.flashMessage.show(res.message, {cssClass: 'alert-success text-center' , timeout: 5000});
           this.siteForm.reset();

        },
        error => {
          this.flashMessage.show(error.message, {cssClass: 'alert-danger text-center' , timeout: 5000});

        }
      );

  }

  loadForms(id: string) {
    this.mainService.getForms(id)
      .subscribe(
        res => this.forms = res,
        error => console.log(error)
      );
  }

}
