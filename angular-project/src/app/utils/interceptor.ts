import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';

@Injectable()
export class JwtAppInterceptor implements HttpInterceptor {
  // declarations
  public token = null;
  private destroyInstance: Subject<boolean> = new Subject();

  constructor(private router: Router, private authFacade: AuthFacade) {
    authFacade
      .getLogin$()
      .pipe(takeUntil(this.destroyInstance))
      .subscribe(login => {
        if (login) {
          this.token = login.token;
        }
      });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.url.includes('/login')) {
      const token = `Bearer ${this.token}`;
      req = req.clone({
        setHeaders: {
          Authorization: `${token}`,
        },
      });
    } else {
      const token = `Bearer ${this.token}`;
      req = req.clone({
        setHeaders: {},
      });
    }
    return next.handle(req).pipe(
      tap(
        (event: any) => {
          // if (event instanceof HttpResponse) { }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              localStorage.removeItem('auth');
              this.authFacade.reset();
              this.router.navigate(['/auth']);
            }
          }
        }
      )
    );
  }
}
