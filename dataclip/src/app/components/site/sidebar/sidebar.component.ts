import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MainService} from "../../../services/main.service";
import {ActivatedRoute, Event, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InteractionService} from "../../../services/interaction.service";
import {UserLimitService} from "../../../services/user-limit.service";

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
  user: any;

  isSelectSite = false;
  limitData: any;
  stats: any;
  isSiteLimit: boolean;
  isFormLimit: boolean;

  showIndicator = true;
  constructor(
    private mainService: MainService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private fb: FormBuilder,
    private interactionService: InteractionService,
    private userLimitService: UserLimitService,
  ) {
    this.user = this.activatedRoute.snapshot.data['user'];
    if (this.user){
      this.isSiteLimit = true;
      this.isFormLimit = true;
      this.limitData = this.userLimitService.getUserLimit(this.user.type);
      this.authService.getStats()
        .subscribe(
          res => {
            this.stats = res;
            if (this.limitData.siteLimit > this.stats.siteCount){
              this.isSiteLimit = false;
            }
            if (this.limitData.formLimit > this.stats.formCount){
              this.isFormLimit = false;
            }
            console.log(this.limitData);
            console.log(this.stats);
          }
        );

      // console.log(this.limitData);
    }
  }

  ngOnInit() {
    this.loadSite = this.activatedRoute.snapshot.paramMap.get('name');
    console.log(this.loadSite);
    this.mainService.getSites()
      .subscribe(
        res => {this.sites = res; console.log(this.sites)},
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
    this.router.navigate([`site/${siteName}/${siteId}`]);
    // this.interactionService.sendMessage('hello');
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
          this.ngOnInit();

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

  isSiteSelected() {
    return !!localStorage.getItem('siteId');
  }

  //
  // ngAfterViewInit(): void {
  //   this.shepherdService.defaultStepOptions = {
  //     classes: '.',
  //     scrollTo: true,
  //     cancelIcon: {
  //       enabled: true
  //     }
  //   };
  //   this.shepherdService.modal = true;
  //   this.shepherdService.confirmCancel = false;
  //   this.shepherdService.addSteps([
  //     {
  //       id: 'intro',
  //       attachTo: {
  //         element: '.avatar',
  //         on: 'bottom'
  //       },
  //       beforeShowPromise: function() {
  //         return new Promise(function(resolve) {
  //           setTimeout(function() {
  //             window.scrollTo(0, 0);
  //             resolve();
  //           }, 300);
  //         });
  //       },
  //       buttons: [
  //         {
  //           classes: 'shepherd-button-secondary',
  //           text: 'Exit',
  //           type: 'cancel'
  //         },
  //         {
  //           classes: 'shepherd-button-primary',
  //           text: 'Back',
  //           type: 'back'
  //         },
  //         {
  //           classes: 'shepherd-button-primary',
  //           text: 'Next',
  //           type: 'next'
  //         }
  //       ],
  //       cancelIcon: {
  //         enabled: true
  //       },
  //       classes: '',
  //       highlightClass: 'highlight',
  //       scrollTo: false,
  //       title: 'Welcome to DataClip!',
  //       text: ['You can see profile settings and packages, pricing related to packages.'],
  //       when: {
  //         show: () => {
  //           console.log('show step');
  //         },
  //         hide: () => {
  //           console.log('hide step');
  //         }
  //       }
  //     },
  //     {
  //       id: 'intro',
  //       attachTo: {
  //         element: '.step-two',
  //         on: 'bottom'
  //       },
  //       beforeShowPromise: function () {
  //         return new Promise(function (resolve) {
  //           setTimeout(function () {
  //             window.scrollTo(0, 0);
  //             resolve();
  //           }, 300);
  //         });
  //       },
  //       buttons: [
  //         {
  //           classes: 'shepherd-button-secondary',
  //           text: 'Exit',
  //           type: 'cancel'
  //         },
  //         {
  //           classes: 'shepherd-button-primary',
  //           text: 'Back',
  //           type: 'back'
  //         },
  //         {
  //           classes: 'shepherd-button-primary',
  //           text: 'Next',
  //           type: 'next'
  //         }
  //       ],
  //       cancelIcon: {
  //         enabled: true
  //       },
  //       classes: '',
  //       highlightClass: 'highlight',
  //       scrollTo: false,
  //       title: 'Step 1',
  //       text: ['Please create the your first site'],
  //       when: {
  //         show: () => {
  //           console.log('show step');
  //         },
  //         hide: () => {
  //           console.log('hide step');
  //         }
  //       }
  //     },
  //     {
  //       id: 'intro',
  //       attachTo: {
  //         element: '.step-three',
  //         on: 'bottom'
  //       },
  //       beforeShowPromise: function () {
  //         return new Promise(function (resolve) {
  //           setTimeout(function () {
  //             window.scrollTo(0, 0);
  //             resolve();
  //           }, 300);
  //         });
  //       },
  //       buttons: [
  //         {
  //           classes: 'shepherd-button-secondary',
  //           text: 'Exit',
  //           type: 'cancel'
  //         },
  //         {
  //           classes: 'shepherd-button-primary',
  //           text: 'Back',
  //           type: 'back'
  //         },
  //         {
  //           classes: 'shepherd-button-primary',
  //           text: 'Next',
  //           type: 'next'
  //         }
  //       ],
  //       cancelIcon: {
  //         enabled: true
  //       },
  //       classes: '',
  //       highlightClass: 'highlight',
  //       scrollTo: false,
  //       title: 'Step 2',
  //       text: ['After create a site choose your site from this dropdown'],
  //       when: {
  //         show: () => {
  //           console.log('show step');
  //         },
  //         hide: () => {
  //           console.log('hide step');
  //         }
  //       }
  //     }
  //   ]);
  //
  //   if (localStorage.getItem('tour')){
  //     console.log('not new');
  //   } else {
  //     this.shepherdService.start();
  //     localStorage.setItem('tour', 'ok');
  //   }
  //
  // }
  //

}
