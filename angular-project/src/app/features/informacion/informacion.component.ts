import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { map } from 'rxjs/operators';
import { DataRespGetDetalleOT } from '@data';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss'],
})
export class InformacionComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  detalleOt$: Observable<DataRespGetDetalleOT>;
  loginAuth$: Observable<any>;
  ot_id: number;
  constructor(
    private authFacade: AuthFacade,
    private otFacade: OtFacade,
    private rutaActiva: ActivatedRoute
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
            perfil: loginAuth.nombre_perfil_select,
          };
        }
        return auth;
      })
    );
    this.subscription.add(
      this.rutaActiva.firstChild.params.subscribe((params: Params) => {
        if (params.id) {
          this.ot_id = params.id;
          this.otFacade.getDetalleOT(+params.id);
        }
      })
    );
    this.detalleOt$ = this.otFacade.getDetalleOT$();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
