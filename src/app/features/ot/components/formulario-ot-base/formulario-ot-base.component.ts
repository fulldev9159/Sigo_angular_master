import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CubicacionContrato } from '@model';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { OTFacade } from '@storeOT/ot/ot.facades';
import { UsuarioFacade } from '@storeOT/usuario/usuario.facades';
import { combineLatest, map, Observable, Subscription, take, tap } from 'rxjs';
interface Dropdown {
  name: string;
  code: number;
}

@Component({
  selector: 'zwc-formulario-ot-base',
  templateUrl: './formulario-ot-base.component.html',
  styleUrls: ['./formulario-ot-base.component.scss'],
})
export class FormularioOtBaseComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  @Input() form: FormGroup;

  contratoUsuarios$: Observable<Dropdown[]> = this.usuarioFacade
    .getContratosUsuario$()
    .pipe(
      // tap(values => (this.contratosUsuario = values)),
      map(values => {
        let tmp = [...values];
        return tmp.sort((a, b) =>
          a.model_contrato_id.nombre > b.model_contrato_id.nombre ? 1 : -1
        );
      }),
      map(values =>
        values.map(value => ({
          name: value.model_contrato_id.nombre,
          code: value.contrato_id,
        }))
      ),
      take(1)
    );

  cubicacioneContrato: CubicacionContrato[] = [];
  cubicacionesContrato$: Observable<Dropdown[]> = this.cubicacionFacade
    .getCubicacionesContrato$()
    .pipe(
      tap(values => (this.cubicacioneContrato = values)),
      map(values => {
        let tmp = [...values];
        return tmp.sort((a, b) =>
          a.cubicacion_nombre > b.cubicacion_nombre ? 1 : -1
        );
      }),
      map(values =>
        values.map(value => ({
          name: value.cubicacion_nombre,
          code: value.cubicacion_id,
        }))
      )
    );
  cubicacionSelected$ = this.otFacade.cubicacionSelected$();
  // LOADINGS
  loadingGetCubicacionesContrato$: Observable<boolean> =
    this.loadingFacade.sendingGetCubicacionesContrato$();

  constructor(
    private cubicacionFacade: CubicacionFacade,
    private otFacade: OTFacade,
    private usuarioFacade: UsuarioFacade,
    private loadingFacade: LoadingsFacade
  ) {}

  ngOnInit(): void {
    this.form.get('cubicacion_id').disable();

    this.subscription.add(
      this.form.get('contrato').valueChanges.subscribe(contrato_id => {
        if (contrato_id !== null && contrato_id !== undefined) {
          this.form.get('cubicacion_id').enable();
          this.cubicacionFacade.getCubicacionesContrato(+contrato_id);
        }
      })
    );

    this.subscription.add(
      this.form.get('cubicacion_id').valueChanges.subscribe(cubicacion_id => {
        if (cubicacion_id !== null && cubicacion_id !== undefined) {
          let cubicacionSelected = this.cubicacioneContrato.filter(
            value => value.cubicacion_id === +cubicacion_id
          )[0];
          this.otFacade.cubicacionSelected(cubicacionSelected);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
