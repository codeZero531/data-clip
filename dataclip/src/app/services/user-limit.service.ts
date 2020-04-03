import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserLimitService {

  constructor() { }

  getUserLimit(type: number): { siteLimit: number; formLimit: number; submissionLimit: number } {
    const data = {siteLimit: 0, formLimit: 0, submissionLimit: 0};
    switch (type) {
      case 0: //free
        data.formLimit = 1;
        data.siteLimit = 1;
        data.submissionLimit = 500;
        return data;
      case 1: //basic
        data.formLimit = 10;
        data.siteLimit = 1;
        data.submissionLimit = 10000;
        return data;
      case 2: //pro
        data.formLimit = 100;
        data.siteLimit = 100;
        data.submissionLimit = 100000;
        return data;
      case 3: //agency
        data.formLimit = 100;
        data.siteLimit = 100;
        data.submissionLimit = 1000000;
        return data;
      default:
        return data;
    }
  }
}
