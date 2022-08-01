import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authFacade: AuthFacade) {}

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
    return next.handle(req).pipe(
      tap(
        (event: any) => {
          // if (event instanceof HttpResponse) { }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.authFacade.clearSession();
              this.router.navigate(['/login/auth']);
            }
          }
        }
      )
    );
  }
}
