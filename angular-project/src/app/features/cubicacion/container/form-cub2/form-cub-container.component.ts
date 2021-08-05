import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription, of } from 'rxjs';
import { map, tap, filter, withLatestFrom } from 'rxjs/operators';

import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import * as CubModel from '@storeOT/features/cubicacion/cubicacion.model';

@Component({
  selector: 'app-form-cub2-container',
  templateUrl: './form-cub-container.component.html',
  styleUrls: ['./form-cub-container.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCub2ContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  autoSuggestItems$: Observable<CubModel.AutoSuggestItem[]> = of([]);
  contratosMarcos$: Observable<CubModel.ContractMarco[]> = of([]);
  proveedores$: Observable<CubModel.Provider[]> = of([]);
  regiones$: Observable<CubModel.Region[]> = of([]);
  tiposServicio$: Observable<CubModel.TypeService[]> = of([]);

  formControls = {
    // cubicacion_id: null,
    nombre: new FormControl('', [
      Validators.required,
      this.noWhitespace,
      Validators.maxLength(300),
    ]),
    contrato_marco_id: new FormControl(null, [Validators.required]),
    subcontrato_id: new FormControl(null, [Validators.required]),
    proveedor_id: new FormControl(null, [Validators.required]),
    region_id: new FormControl(null, [Validators.required]),
    tipo_servicio_id: new FormControl(null, []),
    // lpus: [],
  };

  formCubicacion: FormGroup = new FormGroup(this.formControls);

  noWhitespace(control: FormControl): any {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  errorMessageFn = errors => {
    if (errors.required || errors.whitespace) {
      return 'Este campo es requerido';
    }
    if (errors.maxlength) {
      return `Debe tener a lo más ${errors.maxlength.requiredLength} caracteres`;
    }
    return 'Este campo es inválido';
  }; // tslint:disable-line

  constructor(private cubageFacade: CubicacionFacade) {}

  ngOnInit(): void {
    this.cubageFacade.resetData();

    this.initObservables();
    this.initFormControlsEvents();
    this.initData();
  }

  initObservables(): void {
    this.autoSuggestItems$ = this.cubageFacade.getAutoSuggestSelector$();
    this.contratosMarcos$ = this.cubageFacade.getContractMarcoSelector$();
    this.proveedores$ = this.cubageFacade.getProvidersSelector$().pipe(
      map(proveedores => proveedores || []),
      tap(proveedores => this.resetProveedoresFormControl(proveedores))
    );
    this.regiones$ = this.cubageFacade.getRegionsSelector$().pipe(
      map(regiones => regiones || []),
      tap(regiones => this.resetRegionesFormControl(regiones))
    );
    this.tiposServicio$ = this.cubageFacade.getTypeServicesSelector$().pipe(
      map(tiposServicio => tiposServicio || []),
      tap(tiposServicio => this.resetTiposServicioFormControl(tiposServicio))
    );
  }

  resetProveedoresFormControl(proveedores: CubModel.Provider[]): void {
    this.formCubicacion.get('subcontrato_id').reset();
    this.formCubicacion.get('proveedor_id').reset();

    if (proveedores.length > 0) {
      this.formCubicacion.get('subcontrato_id').enable();
      this.formCubicacion.get('proveedor_id').enable();
    } else {
      this.formCubicacion.get('subcontrato_id').disable();
      this.formCubicacion.get('proveedor_id').disable();
    }
  }

  resetRegionesFormControl(regiones: CubModel.Region[]): void {
    this.formCubicacion.get('region_id').reset();

    if (regiones.length > 0) {
      this.formCubicacion.get('region_id').enable();
    } else {
      this.formCubicacion.get('region_id').disable();
    }
  }

  resetTiposServicioFormControl(tiposServicio: CubModel.TypeService[]): void {
    this.formCubicacion.get('tipo_servicio_id').reset();

    if (tiposServicio.length > 0) {
      this.formCubicacion.get('tipo_servicio_id').enable();
    } else {
      this.formCubicacion.get('tipo_servicio_id').disable();
    }
  }

  initFormControlsEvents(): void {
    this.initContratoMarcoFormControlEvent();
    this.initProveedorFormControlEvent();
    this.initRegionFormControlEvent();
  }

  initContratoMarcoFormControlEvent(): void {
    this.subscription.add(
      this.formCubicacion
        .get('contrato_marco_id')
        .valueChanges.subscribe(contrato_marco_id => {
          if (contrato_marco_id !== null && contrato_marco_id !== undefined) {
            this.cubageFacade.getSubContractedProvidersAction({
              contrato_marco_id: +contrato_marco_id,
            });
            // this.formCubicacion.get('subcontrato_id').reset();
            // this.formCubicacion.get('proveedor_id').reset();
            // this.formCubicacion.get('region_id').reset();
            // this.formCubicacion.get('tipo_servicio_id').reset();

            // this.cubageFacade.resetServices();
          } else {
            this.resetProveedoresFormControl([]);
          }
        })
    );
  }

  initProveedorFormControlEvent(): void {
    this.subscription.add(
      this.formCubicacion.get('subcontrato_id').valueChanges.subscribe(key => {
        if (key !== undefined && key !== null) {
          const { subcontratosID, proveedorID } = this.extractProviderKeys(key);
          this.formCubicacion.get('proveedor_id').setValue(proveedorID);

          this.cubageFacade.getSubContractedRegionsAction({
            subcontrato_id: subcontratosID,
          });
        } else {
          this.resetRegionesFormControl([]);
        }
      })
    );
  }

  initRegionFormControlEvent(): void {
    this.subscription.add(
      this.formCubicacion
        .get('region_id')
        .valueChanges.pipe(
          withLatestFrom(
            this.formCubicacion
              .get('subcontrato_id')
              .valueChanges.pipe(
                filter(key => key !== undefined && key !== null)
              )
          )
        )
        .subscribe(([region_id, key]) => {
          if (region_id !== undefined && region_id !== null) {
            const { subcontratosID, proveedorID } = this.extractProviderKeys(
              key
            );

            this.cubageFacade.getSubContractedTypeServicesAction({
              subcontrato_id: subcontratosID,
              region_id: +region_id,
            });
          } else {
            this.resetTiposServicioFormControl([]);
          }
        })
    );
  }

  initData(): void {
    this.formCubicacion.get('subcontrato_id').disable({ emitEvent: false });
    this.formCubicacion.get('proveedor_id').disable({ emitEvent: false });

    this.formCubicacion.get('region_id').disable({ emitEvent: false });
    this.formCubicacion.get('tipo_servicio_id').disable({ emitEvent: false });

    this.cubageFacade.getAutoSuggestAction('', 5);
    this.cubageFacade.getContractMarcoAction();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goBack(): void {
    this.cubageFacade.resetData();
  }

  // acciones del autocompletado con el campo 'nombre'
  nameSelected(event: any): void {
    console.log('name selected', event);
  }

  nameChanged(name: string): void {
    this.cubageFacade.getAutoSuggestAction(name, 5);
  }

  nameFocused(event: any): void {}

  nameCleared(event: any): void {
    this.cubageFacade.getAutoSuggestAction('', 5);
  }

  providerKey(provider: CubModel.Provider): string {
    return `${provider.subcontrato_id.map(sID => sID + '').join(',')}-${
      provider.id
    }`;
  }

  extractProviderKeys(
    key: string
  ): {
    subcontratosID: number[];
    proveedorID: number;
  } {
    const [subcontratosIDStr, proveedorID] = key.split('-');
    const subcontratosID = subcontratosIDStr
      .split(',')
      .map(subcontratoID => +subcontratoID);

    return {
      subcontratosID,
      proveedorID: +proveedorID,
    };
  }
}
