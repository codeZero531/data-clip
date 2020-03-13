import { Component, OnInit } from '@angular/core';
import {MainService} from "../../../services/main.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sites: any;

  constructor(
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.mainService.getSites()
      .subscribe(
        res => this.sites = res,
        error => console.log(error)
      );
  }

}
