import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable, of } from 'rxjs';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { map } from 'rxjs/operators';
import { OtFacade } from '@storeOT/features/ot/ot.facade';

@Component({
  selector: 'app-acta',
  templateUrl: './acta.component.html',
  styleUrls: ['./acta.component.scss'],
})
export class ActaComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  loginAuth$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private authFacade: AuthFacade,
    private otFacade: OtFacade
  ) {}

  ngOnInit(): void {
    this.loginAuth$ = this.authFacade.getLogin$().pipe(
      map(loginAuth => {
        let auth;
        if (loginAuth) {
          // const perm = loginAuth.perfiles[0].permisos.map(x => x.slug);
          // this.permissionsService.loadPermissions(perm);
          // const nameArray = loginAuth.usuario_nombre.split(' ');
          auth = {
            ...loginAuth,
            // name: `${nameArray[0]} ${nameArray[2]}`,
            name: loginAuth.usuario_nombre,
            perfil: loginAuth.nombre_perfil_select,
          };
        }
        return auth;
      })
    );

    this.subscription.add(
      this.route.data.subscribe(
        ({ ultimoTipoPago, tiposPago, detalleServicio, detalleUob }) => {
          this.otFacade.getUltimoTipoPagoActaSuccess(ultimoTipoPago.response);
          this.otFacade.getActaTiposPagoSuccess(tiposPago.response);
          this.otFacade.getDetalleServicioPorActaSuccess(
            detalleServicio.response
          );
          this.otFacade.getDetalleUobPorActaSuccess(detalleUob.response);
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
