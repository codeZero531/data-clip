import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserLimitService {

  constructor() { }

  getUserLimit(type: number): { siteLimit: number; formLimit: number } {
    const data = {siteLimit: 0, formLimit: 0};
    switch (type) {
      case 0:
        data.formLimit = 2;
        data.siteLimit = 1;
        return data;
      case 1:
        data.formLimit = 1;
        data.siteLimit = 10;
        return data;
      default:
        return data;
    }
  }
}
