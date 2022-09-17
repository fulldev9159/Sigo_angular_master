import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Dropdown } from '@model';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { OTFacade } from '@storeOT/ot/ot.facades';
import { map, Observable, Subscription } from 'rxjs';

// TODO: MIGRAR VALIDACIONES DE FECHA
@Component({
  selector: 'zwc-formulario-ot-extras',
  templateUrl: './formulario-ot-extras.component.html',
  styleUrls: ['./formulario-ot-extras.component.scss'],
})
export class FormularioOtExtrasComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  @Input() form: FormGroup;

  // DATA
  adminContratoFromCub$: Observable<Dropdown[]> = this.cubicacionFacade
    .getAdminContratoFromCub$()
    .pipe(
      map(values => {
        let tmp = [...values];
        return tmp.sort((a, b) => (a.nombre > b.nombre ? 1 : -1));
      }),
      map(values =>
        values.map(value => ({
          name: value.nombre,
          code: value.id,
        }))
      )
    );

  // LOADINGS
  loadingAdminContratoFromCub$: Observable<boolean> =
    this.loadingsFacade.sendingGetAdminContratoFromCub$();

  constructor(
    private cubicacionFacade: CubicacionFacade,
    private otFacade: OTFacade,
    private loadingsFacade: LoadingsFacade
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.otFacade.cubicacionSelected$().subscribe(cubicacionSelected => {
        if (cubicacionSelected)
          this.cubicacionFacade.getAdminContratoFromCub(
            cubicacionSelected.cubicacion_id
          );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
