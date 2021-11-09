import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, of } from 'rxjs';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import * as data from '@data';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { map } from 'rxjs/operators';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';

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
  form: FormGroup = new FormGroup({
    table: new FormArray([]),
  });

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
          // const nameArray = loginAuth.usuario_nombre.split(' ');
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

    this.subscription.add(
      this.detalleCubicacion$.subscribe(cub => {
        if (cub) {
          cub.forEach(lpu => {
            const group = new FormGroup({
              lpu_id: new FormControl(lpu.lpu_id, [Validators.required]),
              informado: new FormControl(0, [Validators.required]),
            });

            (this.form.get('table') as FormArray).push(group);
          });
        }
      })
    );
  }

  formCntl(index: number) {
    return (this.form.controls['table'] as FormArray).controls[index].get(
      'informado'
    );
  }

  formCntlLpuID(index: number) {
    return (this.form.controls['table'] as FormArray).controls[index].get(
      'lpu_id'
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
