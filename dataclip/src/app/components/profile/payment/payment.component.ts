import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  stats: any;

  constructor(
    private authService: AuthService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Payments - Dataclip');
  }

  ngOnInit() {
    this.authService.getStats()
      .subscribe(res => this.stats = res);
  }

}
