import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LOGINComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email : [''],
      password: ['']
    });
  }
  onSubmit() {
    this.authService.login(this.form.value)
      .subscribe(
        res => {
          if (res.status) {
            //success
            localStorage.setItem('token', res.token);
            const data = {name: res.result[0].name, email: res.result[0].email, id: res.result[0]._id};
            localStorage.setItem('loggedUser', JSON.stringify(data));

          } else {
            //invalid
          }
        }
      );
  }

}
