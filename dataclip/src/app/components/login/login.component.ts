import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LOGINComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email : [''],
      password: ['']
    });
  }
  onSubmit() {
    this.authService.login(this.loginForm.value)
      .subscribe(
        res => {
          if (res.status === true) {
            //success
            console.log(res);
            localStorage.setItem('token', res.token);
            const data = {name: res.result[0].name, email: res.result[0].email, id: res.result[0]._id, type: res.result[0].type};
            localStorage.setItem('user', JSON.stringify(data));
            this.router.navigate(['site']);
          } else {
            //invalid
          }
        }
      );
  }

}
