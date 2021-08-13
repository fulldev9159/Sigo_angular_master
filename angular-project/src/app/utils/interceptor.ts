import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';

@Injectable()
export class JwtAppInterceptor implements HttpInterceptor {
  public token = null;
  public profileID = null;

  constructor(private router: Router, private authFacade: AuthFacade) {
    authFacade
      .getLogin$()
      .pipe(filter(login => login !== null))
      .subscribe(login => (this.token = login.token));

    authFacade
      .getCurrentProfile$()
      .pipe(filter(profile => profile !== null))
      .subscribe(profile => (this.profileID = profile.id));
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('/login')) {
      req = req.clone({
        setHeaders: {},
      });
    } else {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        'X-SIGO-User-Profile': `${this.profileID}`,
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
              localStorage.removeItem('auth');
              this.authFacade.reset();
              this.router.navigate(['/auth']);
            }
            console.log(err);
            // if (err.status.description === 'Sin resultados') {
            //   message = 'El usuario no tiene contratos asignados';
            // }
            // this.snackService.showMessage(message, 'error');
          }
        }
      )
    );
  }
}
