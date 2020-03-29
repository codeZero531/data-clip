import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {MainService} from "../services/main.service";

@Injectable({
  providedIn: 'root'
})
export class GetSiteDataFormIdResolverService implements Resolve<any>{
  siteId: string;
  constructor(
    private mainService: MainService
  ) {
    this.siteId = localStorage.getItem('siteId');
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return  this.mainService.getSiteDataFromId(this.siteId)
  }
}
