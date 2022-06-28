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

import { LoadingService } from '@utilsSIGO/service-progress';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable, Subject, Subscription, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

import * as Data from '@data';
import { BaseFacade } from '@storeOT/features/base/base.facade';
import { DatabaseVersion } from '@data';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  public loading;
  public toggleState = false;
  toggleIcon = '';
  public toggle = 'd-flex';
  public loginAuth$: Observable<any>;
  displayNotificacionesModal = false;
  private destroyInstance$: Subject<boolean> = new Subject();
  subscription: Subscription = new Subscription();
  notificaciones_nuevas: Data.DataNotificaciones[] = [];
  total_nuevas_notificaciones$: Observable<Data.Notificaciones>;
  multiperfiles = false;
  circleUserIcon = faUserCircle;
  databaseVersion$: Observable<DatabaseVersion> =
    this.baseFacade.getDatabaseVersion$();

  constructor(
    private router: Router,
    private authFacade: AuthFacade,
    private cubicacionFacade: CubicacionFacade,
    private otFacade: OtFacade,
    private profileFacade: ProfileFacade,
    private userFacade: UserFacade,
    private notificacioneFacade: NotificacionesFacade,
    private loadingS: LoadingService,
    private permissionsService: NgxPermissionsService,
    private baseFacade: BaseFacade
  ) {}

  ngOnInit(): void {
    // this.listenToLoading();
    if (window.innerWidth < 769) {
      this.toggleIcon = 'pi-angle-double-right';
    } else {
      this.toggleIcon = 'pi-angle-double-left';
    }
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
          this.multiperfiles = loginAuth.multiperfiles;
          const nameArray = loginAuth.usuario_nombre.split(' ');
          auth = {
            ...loginAuth,
            name: loginAuth.usuario_nombre,
            perfil: loginAuth.nombre_perfil_select,
          };
        }
        return auth;
      })
    );

    this.loading$ = this.baseFacade.loading$();
    this.baseFacade.getDatabaseVersion();
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
        if (window.innerWidth < 769) {
          this.toggleIcon = 'pi-angle-double-right';
        } else {
          this.toggleIcon = 'pi-angle-double-left';
        }
        break;
      case this.toggleState === true:
        this.toggle = 'd-flex toggled';
        if (window.innerWidth < 769) {
          this.toggleIcon = 'pi-angle-double-left';
        } else {
          this.toggleIcon = 'pi-angle-double-right';
        }
        break;
    }
  }

  listenToLoading(): void {
    this.loadingS.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe(loading => {
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
    const notificaciones_ids = this.notificaciones_nuevas.map(
      notificaciones => notificaciones.id
    );
    if (notificaciones_ids.length > 0) {
      this.notificacioneFacade.markNotification(notificaciones_ids);
    }
  }

  closeNotificacionesModal(): void {
    this.displayNotificacionesModal = false;
    this.notificacioneFacade.getNotificacioes();
  }

  changePerfil(): void {
    this.authFacade.resetPerfilEscogido();
    this.router.navigate(['/auth/perfil-select']);
  }
}
