import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

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
    private router: Router
  ) { }

  ngOnInit() {
    if (this.authService.loggedIn()){
      this.router.navigate(['site']);
    }
    this.form = this.fb.group({
      name : [''],
      email : [''],
      password: ['']
    });
  }
  onSubmit() {
    this.authService.register(this.form.value)
      .subscribe(
        res => {
          if (res.status) {
            //success
              console.log(res)
          } else {
            //invalid
          }
        }
      );

  }

}
