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
import { filter, finalize, tap } from 'rxjs/operators';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { BaseFacade } from '@storeOT/features/base/base.facade';

@Injectable()
export class JwtAppInterceptor implements HttpInterceptor {
  public token = null;
  public profileID = null;
  nombre_perfil = null;

  constructor(
    private router: Router,
    private authFacade: AuthFacade,
    private baseFacade: BaseFacade
  ) {
    authFacade
      .getLogin$()
      .pipe(filter(login => login !== null))
      .subscribe(login => {
        this.profileID = login.proxy_id;
        this.token = login.token;
        this.nombre_perfil = login.nombre_perfil_select;
      });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const url = window.location.href;
    const expresion = /http.*\/app\/cubicacion\/form-cub\/\d+/g;
    const hallado = url.match(expresion);

    if (hallado === null) {
      this.baseFacade.loading(true);
    }

    if (
      this.profileID &&
      this.nombre_perfil &&
      req.url.includes('/notification_tray/get')
    ) {
      this.authFacade.refeshSession(this.profileID);
    }

    if (req.url.includes('/login/start')) {
      req = req.clone({
        setHeaders: {},
      });
    } else {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      });
      req = req.clone({ headers });
    }
    // else {
    //   const headers = new HttpHeaders({
    //     Authorization: `Bearer ${this.token}`,
    //     'X-SIGO-User-Profile': `${this.profileID}`,
    //   });
    //   req = req.clone({ headers });
    // }

    return next.handle(req).pipe(
      finalize(() => {
        // console.log(req.url);
        if (hallado === null) {
          this.baseFacade.loading(false);
        }
      }),
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
