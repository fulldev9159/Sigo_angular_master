import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContratoFacade } from '@storeOT/contrato/contrato.facades';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { map, Observable, Subscription } from 'rxjs';

interface Dropdown {
  name: string;
  code: number;
}
@Component({
  selector: 'zwc-agregar-servicios-form',
  templateUrl: './agregar-servicios-form.component.html',
  styleUrls: ['./agregar-servicios-form.component.scss'],
})
export class AgregarServiciosFormComponent {
  subscription: Subscription = new Subscription();
  // DATOS A USAR
  actividadesContratoProveedor$: Observable<Dropdown[]> = this.contratoFacade
    .getActividadesContratoProveedor$()
    .pipe(
      map(values => {
        let tmp = [...values];
        return tmp.length > 0
          ? tmp.sort((a, b) =>
              a.actividad_id > b.actividad_id
                ? 1
                : b.actividad_id > a.actividad_id
                ? -1
                : 0
            )
          : [];
      }),
      map(values =>
        values.length > 0
          ? values.map(value => ({
              name: value.descripcion,
              code: value.actividad_id,
            }))
          : []
      )
    );

  // FORMULARIO
  formFilterControls: any = {
    actividad_id: new FormControl(null, [Validators.required]),
    tipo_servicio_id: new FormControl(null, [Validators.required]),
    servicio_id: new FormControl('', [Validators.required]),
    unidad_obra_cod: new FormControl(null, [Validators.required]),
  };
  formFilter: FormGroup = new FormGroup(this.formFilterControls);

  // LOADINGS
  getActividadesContratoProveedor$ =
    this.loadingsFacade.sendingGetActividadesContratoProveedor$();

  constructor(
    private contratoFacade: ContratoFacade,
    private loadingsFacade: LoadingsFacade
  ) {}
}
