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
      case 0:
        data.formLimit = 3;
        data.siteLimit = 2;
        data.submissionLimit = 500;
        return data;
      case 1:
        data.formLimit = 1;
        data.siteLimit = 10;
        data.submissionLimit = 1000;
        return data;
      default:
        return data;
    }
  }
}
