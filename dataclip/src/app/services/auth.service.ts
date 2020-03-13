import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
  loggedIn() {
    return !!localStorage.getItem('user');
  }
  getToken() {
    return localStorage.getItem('token');
  }
  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/login`, data);
  }
  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/register`, data);
  }
}
