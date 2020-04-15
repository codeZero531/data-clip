import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LOGINComponent implements OnInit {
  loginForm: FormGroup;
  loadingIndicator: boolean;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Login - Dataclip');
  }

  ngOnInit() {
    if (this.authService.loggedIn()){
      this.router.navigate(['site']);
    }
    this.loginForm = this.fb.group({
      email : ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  get formcontrols() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.loadingIndicator = true;
    this.authService.login(this.loginForm.value)
      .subscribe(
        res => {
          if (res.status) {
            this.flashMessage.show(res.message, {cssClass: 'alert-success', timeout: 5000})

            //success
            // console.log(res);
            localStorage.setItem('token', res.token);
            const data = {
              name: res.result[0].name,
              email: res.result[0].email,
              id: res.result[0]._id,
              type: res.result[0].type
            };
            // localStorage.setItem('user', JSON.stringify(data));
            this.loadingIndicator = false;
            this.router.navigate(['site']);

          } else {
            //invalid
            this.loadingIndicator = false;
            this.flashMessage.show(res.message, {cssClass: 'alert-danger ', timeout: 5000})
            this.formcontrols.password.reset();
          }
        },
        error => {
          this.loadingIndicator = false;
          this.flashMessage.show('Try again!', {cssClass: 'alert-danger ', timeout: 5000})
          this.formcontrols.password.reset();
        }
      );
  }

}
