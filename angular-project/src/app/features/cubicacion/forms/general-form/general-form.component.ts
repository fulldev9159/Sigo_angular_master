import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { Observable, Subscription, of, Subject } from 'rxjs';
import { tap, map, withLatestFrom, takeUntil, filter } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as CubModel from '@storeOT/features/cubicacion/cubicacion.model';
import { GeneralFormService } from '../../service/general-form.service';
import {
  ContratoMarco4Cub,
  CubicacionWithLpu,
  Proveedor,
  SubcontratosProveedor,
} from '@data';

@Component({
  selector: 'app-general-form',
  templateUrl: './general-form.component.html',
  styleUrls: ['./general-form.component.scss'],
})
export class GeneralFormComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  initializationFinished$: Subject<boolean> = new Subject();
  selectedCubicacion$: Observable<CubicacionWithLpu>;
  selectedCubicacion: CubicacionWithLpu;
  selectedCubicacionError$: Observable<Error> = of(null);
  incompleteCubicacionError$: Observable<Error> = of(null);

  autoSuggestItems$: Observable<CubModel.AutoSuggestItem[]> = of([]);
  contratosMarcos$: Observable<ContratoMarco4Cub[]> = of([]);
  proveedores$: Observable<SubcontratosProveedor[]> = of([]);

  controls = {
    nombre: new FormControl('', [
      Validators.required,
      this.noWhitespaceName,
      Validators.maxLength(300),
    ]),
    contrato_marco_id: new FormControl(null, [Validators.required]),
    subcontrato_id: new FormControl(null, [Validators.required]),
    proveedor_id: new FormControl(null, [Validators.required]),
  };

  form: FormGroup = new FormGroup(this.controls);

  noWhitespaceName(control: FormControl): any {
    const nombre =
      typeof control.value === 'object' ? control.value.name : control.value;
    const isWhitespace = (nombre || '').trim().length === 0;
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

  constructor(
    private cubageFacade: CubicacionFacade,
    private generalFormService: GeneralFormService,
    private detector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.autoSuggestItems$ = this.cubageFacade.getAutoSuggestSelector$();
    this.contratosMarcos$ = this.cubageFacade.getContractMarcoSelector$();
    this.proveedores$ = this.cubageFacade.getProvidersSelector$().pipe(
      map(proveedores => proveedores || []),
      tap(proveedores => this.checkProveedoresAndEnable(proveedores))
    );

    this.selectedCubicacion$ = this.cubageFacade
      .getSingleCubicacion$()
      .pipe(
        filter(cubicacion => cubicacion !== null && cubicacion !== undefined)
      );

    this.selectedCubicacionError$ = this.cubageFacade
      .getSingleCubicacionError$()
      .pipe(filter(error => error !== null && error !== undefined));

    this.subscription.add(
      this.form.get('nombre').valueChanges.subscribe(value => {
        const nombre = typeof value === 'object' ? value.name : value;
        this.generalFormService.setValueChanges({
          controlName: 'nombre',
          value: { nombre },
        });
      })
    );

    this.subscription.add(
      this.form
        .get('contrato_marco_id')
        .valueChanges.pipe(withLatestFrom(this.contratosMarcos$))
        .subscribe(([contrato_marco_id, contratos]) => {
          this.resetProveedoresFormControl();
          if (contrato_marco_id !== null && contrato_marco_id !== undefined) {
            this.generalFormService.setValueChanges({
              controlName: 'contrato_marco_id',
              value: {
                contrato_marco_id,
                contrato_marco: contratos.find(
                  contrato => contrato.id === +contrato_marco_id
                ),
              },
            });
            this.cubageFacade.getSubContractedProvidersAction({
              contrato_marco_id: +contrato_marco_id,
            });
          } else {
            this.generalFormService.setValueChanges({
              controlName: 'contrato_marco_id',
              value: null,
            });
            this.checkProveedoresAndEnable([]);
          }
        })
    );

    this.subscription.add(
      this.form.get('subcontrato_id').valueChanges.subscribe(key => {
        if (key !== undefined && key !== null) {
          const { subcontratosID, proveedorID } = this.extractProviderKeys(key);

          this.form.get('proveedor_id').setValue(proveedorID);

          this.generalFormService.setValueChanges({
            controlName: 'subcontrato_id',
            value: {
              subcontrato_id: subcontratosID,
            },
          });
        } else {
          this.generalFormService.setValueChanges({
            controlName: 'subcontrato_id',
            value: null,
          });
        }
      })
    );

    this.subscription.add(
      this.form
        .get('proveedor_id')
        .valueChanges.pipe(withLatestFrom(this.proveedores$))
        .subscribe(([proveedor_id, proveedores]) => {
          if (proveedor_id !== undefined && proveedor_id !== null) {
            this.generalFormService.setValueChanges({
              controlName: 'proveedor_id',
              value: {
                proveedor_id,
                proveedor: proveedores.find(
                  proveedor => proveedor.id === proveedor_id
                ),
              },
            });
          } else {
            this.generalFormService.setValueChanges({
              controlName: 'proveedor_id',
              value: null,
            });
          }
        })
    );

    this.form.get('subcontrato_id').disable({ emitEvent: false });
    this.form.get('proveedor_id').disable({ emitEvent: false });

    this.cubageFacade.getAutoSuggestAction('', 5);
    this.cubageFacade.getContractMarcoAction();

    this.subscription.add(
      this.selectedCubicacion$
        .pipe(
          takeUntil(this.initializationFinished$),
          withLatestFrom(this.contratosMarcos$)
        )
        .subscribe(([cubicacion, contratos]) => {
          this.form.get('nombre').setValue(cubicacion.nombre);

          const contrato = contratos.find(
            con => con.id === cubicacion.contrato_marco_id
          );

          if (contrato) {
            this.form.get('contrato_marco_id').setValue(contrato.id);
          } else {
            this.initializationFinished$.next(true);
            this.incompleteCubicacionError$ = of(
              new Error('incomplete cubage')
            );
          }
        })
    );

    this.subscription.add(
      this.proveedores$
        .pipe(
          takeUntil(this.initializationFinished$),
          withLatestFrom(this.selectedCubicacion$)
        )
        .subscribe(([proveedores, cubicacion]) => {
          const proveedor = proveedores.find(
            prov => prov.id === cubicacion.proveedor_id
          );

          if (proveedor) {
            const key = this.providerKey(proveedor);

            this.form.get('subcontrato_id').setValue(key);
          } else {
            this.initializationFinished$.next(true);
            this.incompleteCubicacionError$ = of(
              new Error('incomplete cubage')
            );
          }
        })
    );
  }

  checkProveedoresAndEnable(proveedores: SubcontratosProveedor[]): void {
    if (proveedores.length > 0) {
      this.form.get('subcontrato_id').enable();
      this.form.get('proveedor_id').enable();
    } else {
      this.form.get('subcontrato_id').disable();
      this.form.get('proveedor_id').disable();
    }
  }

  resetProveedoresFormControl(): void {
    this.form.get('subcontrato_id').reset();
    this.form.get('proveedor_id').reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // acciones del autocompletado con el campo 'nombre'
  nameSelected(event: any): void {
    // console.log('name selected', event);
    // this.form.get('nombre').setValue(event.name);
  }

  nameChanged(name: string): void {
    this.cubageFacade.getAutoSuggestAction(name, 5);
  }

  nameFocused(event: any): void {}

  nameCleared(event: any): void {
    this.cubageFacade.getAutoSuggestAction('', 5);
  }

  providerKey(provider: SubcontratosProveedor): string {
    return `${(provider.subcontrato_id || []).map(sID => sID + '').join(',')}-${
      provider.id
    }`;
  }

  extractProviderKeys(key: string): {
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

  touch(): void {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsTouched({
        onlySelf: true,
      });
    });

    this.form.markAsTouched({
      onlySelf: true,
    });
  }

  get valid(): boolean {
    return this.form.valid;
  }

  get values(): any {
    const { nombre, contrato_marco_id, proveedor_id, subcontrato_id } =
      this.form.getRawValue();
    const cubicacion_nombre = typeof nombre === 'object' ? nombre.name : nombre;

    return {
      cubicacion_nombre,
      contrato_marco_id: +contrato_marco_id,
      proveedor_id: +proveedor_id,
      subcontrato_id,
    };
  }
}
