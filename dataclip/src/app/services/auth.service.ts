import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
  logout() {
    this.flashMessage.show('logout successfully!', {cssClass: 'alert-success' ,timeout: 5000});
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('siteId');
    localStorage.removeItem('siteName');
    this.router.navigate(['']);
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
