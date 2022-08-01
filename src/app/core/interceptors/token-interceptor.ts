import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.url.includes('/login/start')) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('auth')).sessionData.token
        }`,
      });
      req = req.clone({ headers });
    }
    return next.handle(req);
  }
}
