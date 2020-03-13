import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isSubmit: boolean;
  user: any;

  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isSubmit = false;
    this.form = this.fb.group({
      email : [''],
      how: [''],
      gender: [''],
      favorite: this.fb.group({
          pizza : [false],
          burger: [false],
          tacos: [false]
      })
    });
  }
  onSubmit() {
    this.isSubmit = true;
    console.log(this.form.value);
  }
  get formcontrol() {
    return this.form.controls;
  }

}
