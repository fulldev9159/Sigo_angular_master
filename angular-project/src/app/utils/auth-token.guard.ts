import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { Observable, Subject, of } from 'rxjs';
import { map, tap, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenGuard implements CanActivate {
  constructor(private router: Router, private authFacade: AuthFacade) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authFacade.getLogin$().pipe(
      map(
        loginAuth =>
          !(loginAuth !== null && loginAuth.token && loginAuth.usuario_id !== 0)
      ),
      tap(loggetOut => {
        if (!loggetOut) {
          this.router.navigate(['/app/dashboard']);
        }
      })
    );
  }
}
