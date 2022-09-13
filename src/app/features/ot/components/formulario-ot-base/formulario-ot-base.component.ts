import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { UsuarioFacade } from '@storeOT/usuario/usuario.facades';
import { map, Observable, Subscription, take, tap } from 'rxjs';
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

  cubicacionesContrato$: Observable<Dropdown[]> = this.cubicacionFacade
    .getCubicacionesContrato$()
    .pipe(
      // tap(values => (this.contratosUsuario = values)),
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

  // LOADINGS
  loadingGetCubicacionesContrato: Observable<boolean> =
    this.loadingFacade.sendingGetCubicacionesContrato$();

  constructor(
    private cubicacionFacade: CubicacionFacade,
    private usuarioFacade: UsuarioFacade,
    private loadingFacade: LoadingsFacade
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.form.get('contrato').valueChanges.subscribe(contrato_id => {
        if (contrato_id !== null && contrato_id !== undefined) {
          this.form.get('cubicacion_id').enable();
          this.cubicacionFacade.getCubicacionesContrato(+contrato_id);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
