import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuardTokenGuard implements CanActivate {

  // declarations
  private destroyInstance$: Subject<boolean> = new Subject();

  constructor(
    private router: Router,
    private authFacade: AuthFacade) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authFacade.getLogin$()
      .pipe(takeUntil(this.destroyInstance$), map(loginAuth => {
        if (loginAuth && (loginAuth.token && (loginAuth.usuario_id !== 0)))
          return true;
        else
          this.router.navigate(['/auth']);
        return false;
      }))

  }

}
