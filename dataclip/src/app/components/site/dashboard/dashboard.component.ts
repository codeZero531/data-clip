import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  siteName: string;
  siteId: string;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.siteName = this.activatedRoute.snapshot.paramMap.get('name');
    this.siteId = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
