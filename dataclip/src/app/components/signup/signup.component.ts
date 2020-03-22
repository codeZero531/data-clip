import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    if (this.authService.loggedIn()){
      this.router.navigate(['site']);
    }
    this.form = this.fb.group({
      name : ['', Validators.required],
      email : ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    this.authService.register(this.form.value)
      .subscribe(
        res => {
          if (res.status) {
            //success
            this.flashMessage.show(res.message, {cssClass: 'alert-success', timeout: 5000});
             this.router.navigate(['login']);
          } else {
            //invalid
            this.flashMessage.show(res.message, {cssClass: 'alert-danger', timeout: 5000})
          }
        }
      );

  }

}
