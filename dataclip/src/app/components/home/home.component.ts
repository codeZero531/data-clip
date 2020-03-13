import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isSubmit: boolean;

  form: FormGroup;
  constructor(
    private fb: FormBuilder
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
