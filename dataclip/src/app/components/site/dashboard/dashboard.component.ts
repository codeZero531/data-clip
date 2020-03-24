import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {MainService} from "../../../services/main.service";
import {InteractionService} from "../../../services/interaction.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  mySubscription: any;

  siteName: string;
  siteId: string;
  data: any;
  bucketData: any;
  keys: any;

  bucketDataCount: number;
  isLoaded = false;
  isLoadingStart = false;
  lastEntryDate: any;
  isBucketDataHave: boolean;


  constructor(
    private activatedRoute: ActivatedRoute,
    private mainService: MainService,
    private interactionService: InteractionService,
    private router: Router
  ) {
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

  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  loadData(bucketId: string) {
    this.isBucketDataHave = false;
    this.isLoadingStart = true;
    console.log(bucketId);
    this.mainService.getBucketData(bucketId)
      .subscribe(
        res => {
          this.bucketData = res[0].data;

          if (this.bucketData.length !==0 ) {
            this.isBucketDataHave = true;
          }

          //date sort accending
          this.bucketData.sort((val1, val2)=> {
            // @ts-ignore
            return new Date(val2.date) - new Date(val1.date)});

          console.log(res[0]);
          this.lastEntryDate = res[0].updatedAt;
          this.keys = res[0].keys;

          this.bucketDataCount = this.bucketData.length;
          this.isLoaded = true;
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




}
