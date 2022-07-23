import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanLoad,
  Route,
} from '@angular/router';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SigoGuard implements CanActivate, CanLoad {
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
    return true;

    // this.authFacade.getSessionData$().pipe(
    //   //   tap(loginAuth => {
    //   //     if (loginAuth && loginAuth.permisos) {
    //   //       this.permissionsService.loadPermissions(loginAuth.permisos);
    //   //     }
    //   //   }),
    //   map(sessionData => {
    //     if (
    //       sessionData &&
    //       sessionData.token !== undefined &&
    //       sessionData.perfil_proxy_id !== undefined &&
    //       sessionData.token !== null &&
    //       sessionData.perfil_proxy_id !== null
    //     ) {
    //       return true;
    //     } else {
    //       this.router.navigate(['/login']);
    //       return false;
    //     }
    //   })
    // );
  }

  canLoad(route: Route): Observable<boolean> {
    return this.validateSessionData();
  }

  private validateSessionData(): Observable<boolean> {
    return this.authFacade.getSessionData$().pipe(
      map(sessionData => {
        if (sessionData) {
          if (sessionData.token === undefined || sessionData.token === null) {
            return false;
          } else {
            return true;
          }
          // return true;
          // sessionData.token !== undefined && sessionData.token !== null;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }),
      take(1)
    );
  }
}
