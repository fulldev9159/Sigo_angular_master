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
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root',
})
export class GuardTokenGuard implements CanActivate {
  constructor(
    private router: Router,
    private authFacade: AuthFacade,
    private permissionsService: NgxPermissionsService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authFacade.getLogin$().pipe(
      // tap(loginAuth => {
      //   if (loginAuth) {
      //     const perm = loginAuth.perfiles[0].permisos.map(x => x.slug);
      //     this.permissionsService.loadPermissions(perm);
      //   }
      // }),
      map(
        loginAuth =>
          loginAuth !== null && loginAuth.token && loginAuth.usuario_id !== 0
      ),
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/auth']);
        }
      })
    );
  }
}
