import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-confirm-mail',
  templateUrl: './confirm-mail.component.html',
  styleUrls: ['./confirm-mail.component.css']
})
export class ConfirmMailComponent implements OnInit {
  userId: string;
  confirmCode: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.confirmCode = this.activatedRoute.snapshot.paramMap.get('code');
    const data = {userId: this.userId, confirmCode: this.confirmCode};
    this.authService.verifyAccount(data)
      .subscribe(
        res => {
          if (res.status) {
            this.flashMessage.show(res.message, {cssClass: 'alert-success', timeout: 5000});
            this.router.navigate(['login']);

          } else {
            this.flashMessage.show(res.message, {cssClass: 'alert-danger', timeout: 5000});
            this.router.navigate(['login']);
          }
        },
        error => console.log(error)
      )


  }

}
