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
export class PerfilSelectGuard implements CanActivate {
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
      map(loginAuth => {
        if (
          loginAuth?.token !== undefined &&
          loginAuth?.proxy_id === undefined
        ) {
          return true;
        } else if (
          loginAuth?.token === undefined &&
          loginAuth?.proxy_id === undefined
        ) {
          this.router.navigate(['/auth/login']);
          return false;
        }
      })
      // tap(loggetOut => {
      //   console.log('auth guard', loggetOut);
      //   if (!loggetOut) {
      //     this.router.navigate(['/app/dashboard']);
      //   }
      // })
    );
  }
}
