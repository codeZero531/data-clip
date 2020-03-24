import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: any;
  passwordUpdateForm: FormGroup;

  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.user = this.activatedRoute.snapshot.data['user'];
  }

  ngOnInit() {
    // this.authService.getUser().subscribe(res => this.user = res);
    this.passwordUpdateForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]]
    });

  }
  get formcontrols(){
    return this.passwordUpdateForm.controls;
  }

  onProfileNameUpdate() {
    this.authService.changeName(this.user.name)
      .subscribe(
        res => {
          this.flashMessage.show(res.message, {cssClass: 'alert-success text-center', timeout: 5000});
          this.ngOnInit();
        },
        error => {
          this.flashMessage.show(error.message, {cssClass: 'alert-danger text-center', timeout: 5000});
        }
      )
  }

  onPasswordChange(){
    this.authService.changePassword(this.passwordUpdateForm.value)
      .subscribe(
        res => {
          if (res.status){
            this.flashMessage.show(res.message, {cssClass: 'alert-success text-center', timeout: 5000});
            this.passwordUpdateForm.reset();
          } else{
            this.flashMessage.show(res.message, {cssClass: 'alert-danger text-center', timeout: 5000});
          }


        },
        error => {
          this.flashMessage.show(error.message, {cssClass: 'alert-danger text-center', timeout: 5000});
        }
      )
  }

}
