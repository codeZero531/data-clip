import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

// import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {

  constructor(
    private titleService: Title
  ) {
    this.titleService.setTitle('Home - Dataclip');
  }

  ngOnInit() {
    localStorage.removeItem('siteName');
    localStorage.removeItem('siteId');
  }

}

