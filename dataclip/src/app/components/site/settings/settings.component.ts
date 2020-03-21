import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  siteName: string;
  siteId: string;

  constructor() { }

  ngOnInit() {
    this.siteName = localStorage.getItem('siteName');
    this.siteId = localStorage.getItem('siteId');
  }

}
