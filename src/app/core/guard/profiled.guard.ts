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
export class ProfiledGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean> | boolean | UrlTree {
    const isProfiled = this.authService.isProfiled();
    const isAuth = this.authService.isAuth();
    if (isProfiled && isAuth) {
      this.router.navigate(['/home']);
      return of(false);
    } else {
      if (!isProfiled && isAuth) {
        return of(true);
      } else {
        this.router.navigate(['/login/auth']);
        return of(false);
      }
    }
  }

  canLoad(route: Route): Observable<boolean> {
    const isProfiled = this.authService.isProfiled();
    const isAuth = this.authService.isAuth();

    if (isProfiled && isAuth) {
      this.router.navigate(['/home']);
      return of(false);
    } else {
      if (!isProfiled && isAuth) {
        return of(true);
      } else {
        this.router.navigate(['/login/auth']);
        return of(false);
      }
    }
  }
}
