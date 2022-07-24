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
import { map } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isLoggin().pipe(
      map(val => {
        if (val) {
          this.router.navigate(['/home']);
        }
        return !val;
      })
    );
  }

  canLoad(route: Route): Observable<boolean> {
    return this.authService.isLoggin().pipe(
      map(val => {
        if (val) {
          this.router.navigate(['/home']);
        }
        return !val;
      })
    );
  }
}
