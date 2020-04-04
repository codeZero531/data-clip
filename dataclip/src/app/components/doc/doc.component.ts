import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.css']
})
export class DocComponent implements OnInit {
  constructor(
    private titleService: Title
  ) {
    this.titleService.setTitle('Documentation - Dataclip');
  }

  ngOnInit() {


  }
  eventHandle(string: string){
   console.log(string);
  }

}
