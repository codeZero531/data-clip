import { Component, OnInit } from '@angular/core';
import {MainService} from "../../../services/main.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sites: any;
  loadSite: string;
  siteForm: FormGroup;
  bucketForm: FormGroup;

  constructor(
    private mainService: MainService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.loadSite = this.activatedRoute.snapshot.paramMap.get('name');
    console.log(this.loadSite);
    this.mainService.getSites()
      .subscribe(
        res => this.sites = res,
        error => console.log(error)
      );

    this.siteForm = this.fb.group({
      siteName: ['', Validators.required],
      hostName: ['', Validators.required],
    });

    this.bucketForm = this.fb.group({
      bucketName: ['', Validators.required],
      siteId: [localStorage.getItem('siteId'), Validators.required],
    });
  }

  onSiteClick(siteName: string, siteId: string) {
    localStorage.setItem('siteName', siteName);
    localStorage.setItem('siteId', siteId);
    this.router.navigate([`site/${siteName}/${siteId}`])
      .then(
        () => location.reload()
      );
  }
  logOut() {
    this.authService.logout();
  }


  onSubmit() {
    this.mainService.createSite(this.siteForm.value)
      .subscribe(
        res => {
          this.flashMessage.show(res.message, {cssClass: 'alert-success text-center' , timeout: 5000});
          this.siteForm.reset();
          location.reload();

        },
        error => {
          this.flashMessage.show(error.message, {cssClass: 'alert-danger text-center' , timeout: 5000});

        }
      );

  }

  createBucketOnSubmit() {
    this.mainService.createBucket(this.bucketForm.value)
      .subscribe(
        res => {
          this.flashMessage.show(res.message, {cssClass: 'alert-success text-center' , timeout: 5000});
          this.siteForm.reset();
          location.reload();

        },
        error => {
          this.flashMessage.show(error.message, {cssClass: 'alert-danger text-center' , timeout: 5000});

        }
      );

  }


}
