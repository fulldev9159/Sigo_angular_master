import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { LoginAuth } from '@storeOT/features/auth/auth.model';
import { LoadingService } from '@utilsSIGO/service-progress';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable, Subject } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayoutComponent implements OnInit, OnDestroy {

  public loading;
  public toggleState = false;
  public toggle = 'd-flex';
  public loginAuth$: Observable<any>;
  private destroyInstance$: Subject<boolean> = new Subject();

  constructor(
    private router: Router,
    private authFacade: AuthFacade,
    private loadingS: LoadingService,
    private permissionsService: NgxPermissionsService
  ) { }

  ngOnInit(): void {

    const perm = ['OT_LIST', 'OT_CREATE'];

    this.permissionsService.loadPermissions(perm);

    this.listenToLoading();
    this.loginAuth$ = this.authFacade.getLogin$()
      .pipe(map(loginAuth => {
        let auth;
        if (loginAuth) {
          const nameArray = loginAuth.usuario_nombre.split(' ');
          auth = { ...loginAuth, name: `${nameArray[0]} ${nameArray[2]}` };
        }
        return auth;
      }));
  }

  ngOnDestroy(): void {
    this.destroyInstance$.next(true);
    this.destroyInstance$.complete();
  }

  toggleAction(): void {
    switch (true) {
      case this.toggleState === false:
        this.toggle = 'd-flex';
        break;
      case this.toggleState === true:
        this.toggle = 'd-flex toggled';
        break;
    }
  }

  listenToLoading(): void {
    this.loadingS.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

  logout(): void {
    localStorage.removeItem('auth');
    this.authFacade.postLoginSuccess(null);
    this.router.navigate(['/auth/login']);
  }
}
