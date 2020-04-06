import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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

  isSiteSelected(){
    return !!localStorage.getItem('siteId');
  }
  getSites(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/get-sites`)
  }
  getForms(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/get-site/${id}`);
  }
  getBucketData(id: string):Observable<any> {
    return this.http.get(`${this.baseUrl}/data/${id}`);
  }
  createSite(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/create-site`, data);
  }
  createBucket(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/create-bucket`, data);
  }
  getSiteDataFromId(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/get-site-from-id/${id}`);
  }
  sitDetailsUpdate(data: any):Observable<any> {
    return this.http.post(`${this.baseUrl}/users/site-update`, data);
  }
  deleteFormFromId(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/bucket-delete/${id}`);
  }
  updateFormName(data: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/users/update-bucket-name`, data);
  }
  deleteSiteData(id: string): Observable<any>{
    return this.http.get(`${this.baseUrl}/users/site-delete/${id}`);
  }
  setWebhook(data: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/users/set-webhook`, data);
  }
  getWebhook(siteId: string): Observable<any>{
    return this.http.get(`${this.baseUrl}/users/get-webhook/${siteId}`);
  }
  deleteWebhook(siteId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/delete-webhook/${siteId}`);
  }
  getSiteApiToken(siteId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/get-site-api-token/${siteId}`);
  }
  getSlackUrl(code: string): Observable<any>{
    const body = new URLSearchParams();
    body.set('code', code);
    body.set('client_id', '1045337279207.1050427310372');
    body.set('client_secret', '23f9b5084aea497cf982cb3c49add0f2');
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post('https://slack.com/api/oauth.v2.access', body.toString() , options)
  }

}
