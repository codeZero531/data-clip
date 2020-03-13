import { Component, OnInit } from '@angular/core';
import {MainService} from "../../../services/main.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sites: any;

  constructor(
    private mainService: MainService,
    private router: Router
  ) { }

  ngOnInit() {
    this.mainService.getSites()
      .subscribe(
        res => this.sites = res,
        error => console.log(error)
      );
  }

  onSiteClick(siteName: string, siteId: string) {
    this.router.navigate([`site/${siteName}/${siteId}`])
      .then(
        () => location.reload()
      );
  }

}
