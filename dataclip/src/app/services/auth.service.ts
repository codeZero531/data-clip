import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, ErrorObserver, observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
import {catchError} from "rxjs/operators";
import {ObserveOnMessage} from "rxjs/internal/operators/observeOn";

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

  getUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/get-user`).pipe(catchError(this.errorHandle));
      // .pipe(catchError(err => {console.log('err'); return throwError(err)}));
    // return JSON.parse(localStorage.getItem('user'));
  }
  verifyAccount(data: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/users/verify-account`, data);
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
  changeName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/update-profile-name/${name}`);
  }
  changePassword(data: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/users/change-user-password`, data);
  }
  getStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/get-stats`);
  }

  errorHandle(errorResponse: HttpErrorResponse){
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('CLIENT SIDE ERROR: ', errorResponse.error.message);
    } else {
      console.error('Server side error: ', errorResponse)
    }
    return throwError(errorResponse)
  }
}
