import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, of } from 'rxjs';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import * as data from '@data';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-informe-avance',
  templateUrl: './informe-avance.component.html',
  styleUrls: ['./informe-avance.component.scss'],
})
export class InformeAvanceComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  loginAuth$: Observable<any>;
  detalleOt$: Observable<data.DataRspDetalleOT>;
  detalleCubicacion$: Observable<data.ResponseDetalleCubicacion[]> = of([]);

  constructor(
    private otFacade: OtFacade,
    private cubFacade: CubicacionFacade,
    private authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
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
    this.detalleOt$ = this.otFacade.getDetalleOtSelector$();
    this.detalleCubicacion$ = this.cubFacade.getDetallesCubicacionSelector$();
    this.subscription.add(
      this.detalleOt$.subscribe(ot => {
        if (ot) {
          this.cubFacade.getDetallesCubicacionAction(ot.cubicacion_id);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
