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
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HomeGuard implements CanActivate {
  constructor(
    private router: Router,
    private authFacade: AuthFacade // private permissionsService: NgxPermissionsService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authFacade.getSessionData$().pipe(
      //   tap(loginAuth => {
      //     if (loginAuth && loginAuth.permisos) {
      //       this.permissionsService.loadPermissions(loginAuth.permisos);
      //     }
      //   }),
      map(sessionData => {
        if (
          sessionData?.token !== undefined &&
          sessionData?.proxy_id !== undefined &&
          sessionData?.token !== null &&
          sessionData?.proxy_id !== null
        ) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
