import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  constructor(
    private titleService: Title
  ) {
    this.titleService.setTitle('Security - Dataclip');
  }

  ngOnInit() {
  }

}
