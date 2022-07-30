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
import { forkJoin, Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean> | boolean | UrlTree {
    const isLoggin = this.authService.isLoggin();
    const isAuth = this.authService.isAuth();
    if (isLoggin) {
      this.router.navigate(['/home']);
      return of(false);
    } else {
      if (isAuth) {
        this.router.navigate(['/login/perfil-select']);
        return of(false);
      } else {
        return of(true);
      }
    }
  }

  canLoad(route: Route): Observable<boolean> {
    const isLoggin = this.authService.isLoggin();
    const isAuth = this.authService.isAuth();
    if (isLoggin) {
      this.router.navigate(['/home']);
      return of(false);
    } else {
      if (isAuth) {
        this.router.navigate(['/login/perfil-select']);
        return of(false);
      } else {
        return of(true);
      }
    }
  }
}
