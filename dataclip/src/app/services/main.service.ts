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

}
