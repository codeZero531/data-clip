import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
  isLoadingStart = false;
  lastEntryDate: any;


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
    this.isLoadingStart = true;
    console.log(bucketId);
    this.mainService.getBucketData(bucketId)
      .subscribe(
        res => {
          this.bucketData = res[0].data;
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
    element.setAttribute('download', "primer-server-task.json");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click(); // simulate click
    document.body.removeChild(element);
  }




}
