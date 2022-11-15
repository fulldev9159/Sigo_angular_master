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

@Injectable({
  providedIn: 'root',
})
export class IsNot2FAGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean> | boolean | UrlTree {
    const is2FALoggedIn = this.authService.is2FALoggedIn();
    const isAuth = this.authService.isAuth();

    if (is2FALoggedIn && isAuth) {
      this.router.navigate(['/home']);
      return of(false);
    } else {
      if (!is2FALoggedIn && isAuth) {
        return of(true);
      } else {
        this.router.navigate(['/login/auth']);
        return of(false);
      }
    }
  }

  canLoad(route: Route): Observable<boolean> {
    const is2FALoggedIn = this.authService.is2FALoggedIn();
    const isAuth = this.authService.isAuth();

    if (is2FALoggedIn && isAuth) {
      this.router.navigate(['/home']);
      return of(false);
    } else {
      if (!is2FALoggedIn && isAuth) {
        return of(true);
      } else {
        this.router.navigate(['/login/auth']);
        return of(false);
      }
    }
  }
}
