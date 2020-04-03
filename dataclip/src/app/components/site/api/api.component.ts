import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {
  token: any;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) {
    this.token = this.activatedRoute.snapshot.data['data'];
  }

  ngOnInit() {

  }
  /* To copy Text from Textbox */
  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.flashMessage.show('Copied to clipboard', {cssClass: 'alert-secondary', timeout: 3000})
  }


}
