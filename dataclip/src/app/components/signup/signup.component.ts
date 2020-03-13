import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
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
