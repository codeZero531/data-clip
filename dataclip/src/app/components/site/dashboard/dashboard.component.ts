import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MainService} from "../../../services/main.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  siteName: string;
  siteId: string;
  data: any;
  bucketData: any;
  keys: any;

  bucketDataCount: number;
  isLoaded = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.siteName = this.activatedRoute.snapshot.paramMap.get('name');
    this.siteId = this.activatedRoute.snapshot.paramMap.get('id');
    this.mainService.getForms(this.siteId)
      .subscribe(
        res => this.data = res,
        error => console.log(error)
      );
  }

  loadData(bucketId: string) {
    console.log(bucketId);
    this.mainService.getBucketData(bucketId)
      .subscribe(
        res => {
          this.bucketData = res[0].data;
          console.log(res[0]);
          this.keys = res[0].keys;
          this.bucketDataCount = this.bucketData.length;
          this.isLoaded = true;
        },
        error => console.log(error)
      );
  }




}
