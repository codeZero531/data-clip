import { Component, OnInit } from '@angular/core';
import {MainService} from "../../../services/main.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sites: any;
  loadSite: string;

  constructor(
    private mainService: MainService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadSite = this.activatedRoute.snapshot.paramMap.get('name');
    console.log(this.loadSite);
    this.mainService.getSites()
      .subscribe(
        res => this.sites = res,
        error => console.log(error)
      );
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

}
