import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import { ProfileFacade } from '@storeOT/features/profile/profile.facade';
import { UserFacade } from '@storeOT/features/user/user.facade';
import { NotificacionesFacade } from '@storeOT/features/notificaciones/notificaciones.facade';

import { LoginAuth } from '@storeOT/features/auth/auth.model';
import { LoadingService } from '@utilsSIGO/service-progress';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable, Subject, Subscription, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import * as Data from '@data';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  public loading;
  public toggleState = false;
  public toggle = 'd-flex';
  public loginAuth$: Observable<any>;
  displayNotificacionesModal = false;
  private destroyInstance$: Subject<boolean> = new Subject();
  subscription: Subscription = new Subscription();
  notificaciones_nuevas: Data.DataNotificaciones[] = [];
  total_nuevas_notificaciones$: Observable<Data.Notificaciones>;

  constructor(
    private router: Router,
    private authFacade: AuthFacade,
    private cubicacionFacade: CubicacionFacade,
    private otFacade: OtFacade,
    private profileFacade: ProfileFacade,
    private userFacade: UserFacade,
    private notificacioneFacade: NotificacionesFacade,
    private loadingS: LoadingService,
    private permissionsService: NgxPermissionsService
  ) {}

  ngOnInit(): void {
    // this.listenToLoading();
    this.notificacioneFacade.getNotificacioes();
    this.total_nuevas_notificaciones$ = this.notificacioneFacade
      .getNotificaciones$()
      .pipe(
        map((notificaciones: Data.Notificaciones) => {
          if (notificaciones) {
            this.notificaciones_nuevas = notificaciones.data.registros_nuevos;
          }
          return notificaciones;
        })
      );

    this.loginAuth$ = this.authFacade.getLogin$().pipe(
      map(loginAuth => {
        let auth;
        if (loginAuth) {
          // const perm = loginAuth.perfiles[0].permisos.map(x => x.slug);
          // this.permissionsService.loadPermissions(perm);
          const nameArray = loginAuth.usuario_nombre.split(' ');
          auth = {
            ...loginAuth,
            // name: `${nameArray[0]} ${nameArray[2]}`,
            name: loginAuth.usuario_nombre,
            perfil: loginAuth.perfiles[0].nombre,
          };
        }
        return auth;
      })
    );
  }

  ngOnDestroy(): void {
    this.destroyInstance$.next(true);
    this.destroyInstance$.complete();
    this.subscription.unsubscribe();
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
      .subscribe(loading => {
        console.log('dasdas');
        this.loading = loading;
      });
  }

  logout(): void {
    localStorage.removeItem('auth');
    this.authFacade.reset();
    this.cubicacionFacade.resetData();
    this.otFacade.resetData();
    this.profileFacade.resetData();
    this.userFacade.resetData();
    this.router.navigate(['/auth/login']);
  }

  openNotificacionesModal(): void {
    this.displayNotificacionesModal = true;
    console.log(this.notificaciones_nuevas);
  }
}
