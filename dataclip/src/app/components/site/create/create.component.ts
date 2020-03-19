import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../../../services/main.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  siteForm: FormGroup;
  sites: any;

  constructor(
    private fb: FormBuilder,
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.siteForm = this.fb.group({
      siteName: ['', Validators.required],
      hostName: ['', Validators.required],
    });
    this.mainService.getSites()
      .subscribe(
        res => this.sites = res,
        error => console.log(error)
      );

  }

  onSubmit() {
    this.mainService.createSite(this.siteForm.value)
      .subscribe(
        res => console.log(res),
        error => console.log(error)
      );


  }

}
