import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpInterceptor} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private http: HttpClient,
    private injector: Injector
  ) { }
  intercept(req, next) {
    const  authService = this.injector.get(AuthService);
    if (!(req.url === 'https://slack.com/api/oauth.v2.access')){
      const tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authService.getToken()}`
        }
      });
      return next.handle(tokenizedReq);
    } else {
      const tokenizedReq = req.clone({
        setHeaders: {
        }
      });
      return next.handle(tokenizedReq);
    }

  }
}
