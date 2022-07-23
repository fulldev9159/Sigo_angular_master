import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    return this.authFacade.getSessionData$().pipe(
      map(sessionData => {
        if (
          sessionData &&
          sessionData.token !== undefined &&
          sessionData.perfil_proxy_id !== undefined &&
          sessionData.token !== null &&
          sessionData.perfil_proxy_id !== null
        ) {
          this.router.navigate(['/app/dashboard']);
          return false;
        } else if (
          (sessionData && sessionData.token === undefined) ||
          sessionData.perfil_proxy_id === undefined ||
          sessionData.token === null ||
          sessionData.perfil_proxy_id === null
        ) {
          return true;
        }
      })
    );
  }
}
