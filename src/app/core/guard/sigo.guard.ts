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
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SigoGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private authService: AuthService // private permissionsService: NgxPermissionsService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    return this.authService.isLoggin().pipe(
      map(val => {
        if (!val) {
          this.router.navigate(['/login']);
        }
        return val;
      })
    );
  }

  canLoad(route: Route): Observable<boolean> {
    return this.authService.isLoggin().pipe(
      map(val => {
        if (!val) {
          this.router.navigate(['/login']);
        }
        return val;
      })
    );
  }
}
