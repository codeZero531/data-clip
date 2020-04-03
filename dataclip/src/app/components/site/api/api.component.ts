import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  isLogin: boolean;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isLogin = this.authService.loggedIn();
  }
  onClick(){
    this.notify.emit('hello');
  }


}
