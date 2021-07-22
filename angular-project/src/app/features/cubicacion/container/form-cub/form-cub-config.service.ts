import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { TableComponetType } from '@storeOT/model';
import * as CubModel from '@storeOT/features/cubicacion/cubicacion.model';

@Injectable({
  providedIn: 'root',
})
export class FormCubConfig {
  constructor(
    private fb: FormBuilder,
    private cubageFacade: CubicacionFacade
  ) {}

  initForm(): FormGroup {
    return this.fb.group({
      cubicacion_id: null,
      nombre: [null, [Validators.required, Validators.maxLength(300)]],
      contrato_marco_id: [null, Validators.required],
      subcontrato_id: null,
      proveedor_id: [null, Validators.required],
      region_id: [null, Validators.required],
      tipo_servicio_id: null,
      lpus: [],
      //   total: 0,
      //
      //   fecha_creacion: null,
      //   usuario_id: null,
      //   usuario_nombre: null,

      //   region_nombre: null,
      //   contrato_marco_nombre: null,

      //   proveedor_nombre: null,
      //
      //   asignado: null,
      //   adm_contrato_nombre: null,
      //   lpus: [],
      //
    });
  }

  detectChangesForm(
    formCubicacion: FormGroup,
    destroyInstance$: Subject<boolean>
  ): void {
    formCubicacion
      .get('contrato_marco_id')
      .valueChanges.pipe(takeUntil(destroyInstance$))
      .subscribe(contrato_marco_id => {
        if (contrato_marco_id) {
          this.cubageFacade.getSubContractedProvidersAction({
            contrato_marco_id: +contrato_marco_id,
          });

          // refrescamos parte de
          //  formulario al cambiar ConstractMarco
          // this.resetForm('CONSTRACTMARCO');
        }
      });

    formCubicacion
      .get('subcontrato_id')
      .valueChanges.pipe(takeUntil(destroyInstance$))
      .subscribe(subcontratoId => {
        if (subcontratoId) {
          const [subcontratos, proveedor] = subcontratoId.split('-');
          const idProve = 'proveedor_id';
          formCubicacion.controls[idProve].setValue(+proveedor);
          this.cubageFacade.getSubContractedRegionsAction({
            subcontrato_id: subcontratos.split(',').map((x: number) => +x),
          });

          // refrescamos parte de
          //  formulario al cambiar SubContractedProviders
          // this.resetForm('SUBCONTRACTEDPROVIDERS');
        }
      });

    formCubicacion
      .get('region_id')
      .valueChanges.pipe(takeUntil(destroyInstance$))
      .subscribe(region_id => {
        if (region_id) {
          const [
            subcontratos,
            proveedor,
          ] = formCubicacion.value.subcontrato_id.split('-');
          this.cubageFacade.getSubContractedTypeServicesAction({
            subcontrato_id: subcontratos.split(',').map((x: number) => +x),
            region_id: +region_id,
          });

          // refrescamos parte de
          //  formulario al cambiar SubContractedProviders
          // this.resetForm('SUBCONTRACTEDTYPESERVICES');
        }
      });

    formCubicacion
      .get('tipo_servicio_id')
      .valueChanges.pipe(takeUntil(destroyInstance$))
      .subscribe(tipo_servicio_id => {
        if (tipo_servicio_id) {
          const [
            subcontratos,
            proveedor,
          ] = formCubicacion.value.subcontrato_id.split('-');
          this.cubageFacade.getSubContractedServicesAction({
            subcontrato_id: subcontratos.split(',').map((x: number) => +x),
            region_id: +formCubicacion.value.region_id,
            tipo_servicio_id: +tipo_servicio_id,
          });

          // refrescamos parte de
          // this.resetForm('SUBCONTRACTEDSERVICES');
        }
      });
  }

  // resetForm(part: string): void {
  //   switch (true) {
  //     case part === 'CONSTRACTMARCO':
  //       // actualizar formulario
  //       this.formCubicacion.get('proveedor_id').reset();
  //       this.formCubicacion.get('region_id').reset();
  //       break;
  //     case part === 'SUBCONTRACTEDPROVIDERS':
  //       // actualizar formulario
  //       this.formCubicacion.get('region_id').reset();
  //       break;
  //     case part === 'SUBCONTRACTEDPROVIDERS':
  //       // actualizar formulario
  //       this.formCubicacion.get('region_id').reset();
  //       break;
  //   }
  // }

  // configTableResumen(
  //   lpusCarrito: CubModel.Service[],
  //   total: number
  // ): TableComponetType {
  //   return {
  //     header: true,
  //     headerConfig: {
  //       title: '',
  //       searchText: 'buscar...',
  //       paginator: false,
  //       actionsType: 'Buttons',
  //     },
  //     body: {
  //       headers: [
  //         {
  //           field: 'Servicio LPU',
  //           type: 'TEXT',
  //           sort: 'lpu_nombre',
  //           header: 'lpu_nombre',
  //           width: '33%',
  //           editable: false,
  //         },
  //         {
  //           field: 'Región',
  //           type: 'TEXT',
  //           header: 'region',
  //           width: '10%',
  //           editable: false,
  //         },
  //         {
  //           field: 'Tipo Servicio',
  //           type: 'TEXT-TITLECASE',
  //           sort: 'tipo_servicio',
  //           header: 'tipo_servicio',
  //           editable: false,
  //         },
  //         {
  //           field: 'Cantidad	',
  //           type: 'INPUTNUMBER',
  //           sort: 'cantidad',
  //           header: 'cantidad',
  //           editable: true,
  //           onchange: (event: Event, item: CubModel.Service) => {
  //             console.log(item);
  //             console.log((event.target as HTMLInputElement).value);
  //             lpusCarrito = lpusCarrito.map((x) => {
  //               if (x.lpu_id === item.lpu_id) {
  //                 return {
  //                   ...x,
  //                   cantidad: +(event.target as HTMLInputElement).value,
  //                   lpu_subtotal: +(
  //                     +x.lpu_precio * +(event.target as HTMLInputElement).value
  //                   ),
  //                 };
  //               }
  //               return x;
  //             });
  //             total = lpusCarrito.reduce((total, currentValue) => {
  //               return total + currentValue.lpu_subtotal;
  //             }, 0);
  //             // this.selected.emit(this.lpuSelected);
  //           },
  //         },
  //         {
  //           field: 'Unidad	',
  //           type: 'TEXT',
  //           sort: 'lpu_unidad_nombre',
  //           header: 'lpu_unidad_nombre',
  //           editable: false,
  //         },
  //         {
  //           field: 'Tipo Moneda	',
  //           type: 'TEXT',
  //           sort: 'tipo_moneda_cod',
  //           header: 'tipo_moneda_cod',
  //           editable: false,
  //         },
  //         {
  //           field: 'Precio',
  //           type: 'NUMBER',
  //           sort: 'lpu_precio',
  //           header: 'lpu_precio',
  //           editable: false,
  //         },
  //         {
  //           field: 'Subtotal	',
  //           type: 'NUMBER',
  //           sort: 'lpu_subtotal',
  //           header: 'lpu_subtotal',
  //         },
  //         {
  //           field: null,
  //           type: 'ACTIONS',
  //           sort: null,
  //           header: null,
  //           editable: false,
  //         },
  //       ],
  //       sort: ['lpu_nombre', 'tipo_servicio', 'lpu_precio'],
  //       actions: [
  //         {
  //           icon: 'p-button-icon pi pi-trash',
  //           class: 'p-button-rounded p-button-danger',
  //           onClick: (item) => {
  //             console.log(item);
  //           },
  //         },
  //       ],
  //     },
  //   };
  // }
}
