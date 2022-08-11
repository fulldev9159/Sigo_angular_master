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
import { Observable, of } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { Accion } from '../model/accion';

@Injectable({
  providedIn: 'root',
})
export class SigoGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private authService: AuthService,
    private permissionsService: NgxPermissionsService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    const isLoggin = this.authService.isLoggin();
    if (!isLoggin) {
      this.router.navigate(['/login']);
    } else {
      const permisos = JSON.parse(
        localStorage.getItem('auth')
      ).sessionData.permisos.map((x: Accion) => x.slug);
      this.permissionsService.loadPermissions(permisos);
    }
    return of(isLoggin);
  }

  canLoad(route: Route): Observable<boolean> {
    const isLoggin = this.authService.isLoggin();
    if (!isLoggin) {
      this.router.navigate(['/login']);
    } else {
      const permisos = JSON.parse(
        localStorage.getItem('auth')
      ).sessionData.permisos.map((x: Accion) => x.slug);
      this.permissionsService.loadPermissions(permisos);
    }

    return of(isLoggin);
  }
}
