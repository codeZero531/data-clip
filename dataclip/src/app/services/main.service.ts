import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MainService {
  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  getSites(): Observable<any> {
    return this.http.get(`${this.baseUrl}/data/get-sites`)
  }

}
