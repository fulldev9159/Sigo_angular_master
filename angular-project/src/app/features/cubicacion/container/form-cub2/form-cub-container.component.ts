import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription, of } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';

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
    // tipo_servicio_id: null,
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
      tap(proveedores => {
        this.formCubicacion.get('subcontrato_id').reset();
        this.formCubicacion.get('proveedor_id').reset();

        if (proveedores.length > 0) {
          this.formCubicacion.get('subcontrato_id').enable();
          this.formCubicacion.get('proveedor_id').enable();
        } else {
          this.formCubicacion.get('subcontrato_id').disable();
          this.formCubicacion.get('proveedor_id').disable();
        }
      })
    );
    this.regiones$ = this.cubageFacade.getRegionsSelector$().pipe(
      map(regiones => regiones || []),
      tap(regiones => {
        this.formCubicacion.get('region_id').reset();

        if (regiones.length > 0) {
          this.formCubicacion.get('region_id').enable();
        } else {
          this.formCubicacion.get('region_id').disable();
        }
      })
    );
  }

  initFormControlsEvents(): void {
    this.subscription.add(
      this.formCubicacion
        .get('contrato_marco_id')
        .valueChanges.subscribe(contrato_marco_id => {
          this.cubageFacade.getSubContractedProvidersAction({
            contrato_marco_id: +contrato_marco_id,
          });
          // this.formCubicacion.get('subcontrato_id').reset();
          // this.formCubicacion.get('proveedor_id').reset();
          // this.formCubicacion.get('region_id').reset();
          // this.formCubicacion.get('tipo_servicio_id').reset();

          // this.cubageFacade.resetServices();
        })
    );

    this.subscription.add(
      this.formCubicacion
        .get('subcontrato_id')
        .valueChanges.pipe(filter(key => key !== undefined && key !== null))
        .subscribe(key => {
          const { subcontratosID, proveedorID } = this.extractProviderKeys(key);
          this.formCubicacion.get('proveedor_id').setValue(proveedorID);

          this.cubageFacade.getSubContractedRegionsAction({
            subcontrato_id: subcontratosID,
          });
        })
    );
  }

  initData(): void {
    this.formCubicacion.get('subcontrato_id').disable({ emitEvent: false });
    this.formCubicacion.get('proveedor_id').disable({ emitEvent: false });

    this.formCubicacion.get('region_id').disable({ emitEvent: false });

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
