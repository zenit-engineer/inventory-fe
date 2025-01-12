import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import { TokenService } from '../services/token-service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if(!this.tokenService.isAccessTokenValid()){
      const refreshToken = this.tokenService.refreshToken;
      if (refreshToken){
        const authReq = request.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${refreshToken}`
        })
      });
        return next.handle(authReq);
      }
    }

    const accessToken = this.tokenService.accessToken;
    if (accessToken) {
      const authReq = request.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${accessToken}`
        })
      });
      return next.handle(authReq);
    }

    return next.handle(request);
  }
}