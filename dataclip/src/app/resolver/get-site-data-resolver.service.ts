import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {MainService} from "../services/main.service";

@Injectable({
  providedIn: 'root'
})
export class GetSiteDataResolverService implements Resolve<any>{
  siteName: string;
  siteId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private mainService: MainService
  ) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.siteName = route.params.name;
    this.siteId = route.params.id;
    return this.mainService.getForms(this.siteId);
  }
}
