import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {MainService} from "../../../services/main.service";
import {InteractionService} from "../../../services/interaction.service";
import {UserLimitService} from "../../../services/user-limit.service";
import {AuthService} from "../../../services/auth.service";
import {Title} from "@angular/platform-browser";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {strictEqual} from "assert";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  mySubscription: any;
  user: any;

  pageEvent: PageEvent;


  siteName: string;
  siteId: string;
  data: any;
  bucketData: any;
  keys: any;

  bucketDataCount: number;
  lastEntryDate: any;
  userLimits: any;

  isLoaded = false;
  isLoadingStart = false;
  isBucketDataHave = false;
  isClickOnBucket = false;
  selectedBucketId = '';

  displayedColumns: string[];
  dataSource: any;
  start = 0;
  end = 25;


  constructor(
    private activatedRoute: ActivatedRoute,
    private mainService: MainService,
    private interactionService: InteractionService,
    private router: Router,
    private userLimitService: UserLimitService,
    private authService: AuthService,
    private titleService: Title,
  ) {
    this.titleService.setTitle('Site - Dataclip');
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });

    this.data = this.activatedRoute.snapshot.data['data'];
  }

  ngOnInit() {

      this.siteName = localStorage.getItem('siteName');
      this.authService.getUser().subscribe(
        res=> {
          this.user = res;
          this.userLimits = this.userLimitService.getUserLimit(this.user.type);
        });

  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  loadData(bucketId: string) {
    this.isBucketDataHave = false;
    this.isLoadingStart = true;
    this.isClickOnBucket = true;
    // console.log(bucketId);
    this.mainService.getBucketData(bucketId)
      .subscribe(
        res => {
          if (res.length !== 0 ) {
            this.bucketData = res[0].data;
            this.isBucketDataHave = true;
            this.isLoadingStart = false;

            //date sort accending
            this.bucketData.sort((val1, val2)=> {
              // @ts-ignore
              return new Date(val2.date) - new Date(val1.date)});

            this.lastEntryDate = res[0].updatedAt;
            this.keys = res[0].keys;
            this.bucketDataCount = this.bucketData.length;

          }

          // this.isLoaded = true;
          this.isLoadingStart = false;
        },
        error => console.log(error)
      );
  }

  downloadJson(myJson){
    var sJson = JSON.stringify(myJson);
    var element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
    element.setAttribute('download', `${this.siteName}.json`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click(); // simulate click
    document.body.removeChild(element);
  }

  clickPage() {
    this.start = this.pageEvent.pageIndex *25 ;
    this.end = this.start +25;
    window.scrollTo(250,0);
  }
}
