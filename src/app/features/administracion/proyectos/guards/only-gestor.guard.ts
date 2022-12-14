import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  Route,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SessionData } from '@model';

@Injectable({
  providedIn: 'root',
})
export class OnlyGestorGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean> | boolean | UrlTree {
    const sessionData: SessionData = JSON.parse(
      localStorage.getItem('auth')
    ).sessionData;

    const isGestor = sessionData?.rol_slug === 'GESTOR';

    if (isGestor) {
      return true;
    } else {
      this.router.navigate(['/']);
      return of(false);
    }
  }
}
