import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { ContractMarco, SubContractedProviders, SubContractedRegions, SubContractedServices, SubContractedTypeServices } from '@storeOT/features/cubicacion/cubicacion.model';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-form-cub',
  templateUrl: './form-cub.component.html',
  styleUrls: ['./form-cub.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormCubComponent implements OnInit, OnDestroy {

  // declarations
  public formCubicacion: FormGroup;
  public constractMarco$: Observable<ContractMarco[]>;
  public subContractedProviders: SubContractedProviders[];
  public subContractedProviders$: Observable<SubContractedProviders[]> = of([]);
  public subContractedRegions: SubContractedRegions[];
  public subContractedRegions$: Observable<SubContractedRegions[]> = of([]);
  public subContractedTypeServices: SubContractedTypeServices[];
  public subContractedTypeServices$: Observable<SubContractedTypeServices[]> = of([]);
  public subContractedServices: SubContractedServices[];
  public subContractedServices$: Observable<SubContractedServices[]> = of();
  private destroyInstance$: Subject<boolean> = new Subject();

  constructor(
    private fb: FormBuilder,
    private cubageFacade: CubicacionFacade
  ) { }

  ngOnInit(): void {
    // inicializamos formulario reactivo
    this.initForm();

    // rescatamos data inicial
    this.constractMarco$ = this.cubageFacade.getContractMarco$();
    this.subContractedProviders$ = this.cubageFacade.getSubContractedProviders$();
    this.subContractedRegions$ = this.cubageFacade.getSubContractedRegions$();
    this.subContractedTypeServices$ = this.cubageFacade.getSubContractedTypeServices$();
    this.subContractedServices$ = this.cubageFacade.getSubContractedServices$();

    // poblamos contratos marco con data mock de momento
    this.cubageFacade.getContractMarcoSuccess([
      {
        id: 12,
        nombre: 'SBE',
        tipo_contrato_id: '1',
        tipo_contrato_nombre: 'Movil'
      },
      {
        id: 13,
        nombre: 'UNIFICADO-2019-MOVIL',
        tipo_contrato_id: '2',
        tipo_contrato_nombre: 'Movil'
      }
    ]);
  }

  ngOnDestroy(): void {
    this.destroyInstance$.next(true);
    this.destroyInstance$.complete();
  }

  initForm() {
    this.formCubicacion = this.fb.group({
      cubicacion_id: null,
      cubicacion_nombre: null,
      total: [null, Validators.required],
      nombre: [null, Validators.required],
      fecha_creacion: [null, Validators.required],
      usuario_id: [null, Validators.required],
      usuario_nombre: [null, Validators.required],
      region_id: [null, Validators.required],
      region_nombre: [null, Validators.required],
      contrato_marco_id: [null, Validators.required],
      contrato_marco_nombre: [null, Validators.required],
      proveedor_id: [null, Validators.required],
      proveedor_nombre: null,
      subcontrato_id: null,
      asignado: null,
      adm_contrato_nombre: null,
      lpus: []
    });

    // detectamos cambios en formulario
    this.detectChangesForm();
  }

  detectChangesForm() {
    this.formCubicacion
      .get('contrato_marco_id')
      .valueChanges
      .pipe(takeUntil(this.destroyInstance$))
      .subscribe(contrato_marco_id => {
        if (contrato_marco_id) {
          // actualizamos store para
          // SubContractedProviders según ConstractMarco
          this.cubageFacade.getSubContractedProvidersSuccess([{
            id: 12312,
            nombre: 'Proveedor Nº 1',
            subcontrato_id: []
          }, {
            id: 12313,
            nombre: 'Proveedor Nº 2',
            subcontrato_id: []
          }]);

          // refrescamos parte de
          //  formulario al cambiar ConstractMarco
          this.resetForm('CONSTRACTMARCO');
        }
      });

    this.formCubicacion
      .get('proveedor_id')
      .valueChanges
      .pipe(takeUntil(this.destroyInstance$))
      .subscribe(proveedor_id => {
        if (proveedor_id) {
          // actualizamos store para
          // SubContractedProviders según ConstractMarco
          this.cubageFacade.getSubContractedRegionsSuccess([{
            id: 12312,
            nombre: 'BIO BIO',
            codigo: '1'
          }, {
            id: 12313,
            nombre: 'METROPOLITANA',
            codigo: '2'
          }]);

          // refrescamos parte de
          //  formulario al cambiar SubContractedProviders
          this.resetForm('SUBCONTRACTEDPROVIDERS');
        }
      });

    this.formCubicacion
      .get('region_id')
      .valueChanges
      .pipe(takeUntil(this.destroyInstance$))
      .subscribe(region_id => {
        if (region_id) {
          // actualizamos store
          this.cubageFacade.getSubContractedTypeServicesSuccess([{
            id: 5,
            nombre: 'INSTALACIONES EN EDIFICIOS DE RED (MOVIL)',
          }, {
            id: 6,
            nombre: 'INSTALACIONES EN EDIFICIOS DE RED (MOVIL)',
          }]);

          // refrescamos parte de
          //  formulario al cambiar SubContractedProviders
          this.resetForm('SUBCONTRACTEDTYPESERVICES');
        }
      });

    this.formCubicacion
      .get('subcontrato_id')
      .valueChanges
      .pipe(takeUntil(this.destroyInstance$))
      .subscribe(subcontrato_id => {
        if (subcontrato_id) {
          // actualizamos store
          this.cubageFacade.getSubContractedServicesSuccess([{
            lpu_id: 5,
            lpu_nombre: 'Zona XIV y III Bloque 1 ADICIONALES ALTA EXIGENCIA Prevencionista de Riesgos in Situ. SEMANA Alza Precio',
            lpu_precio: 1231,
            tipo_moneda_id: 2342,
            tipo_moneda_cod: 'Pesos',
            lpu_numero_producto: 'Serv10498'
          }]);

          // refrescamos parte de
          this.resetForm('SUBCONTRACTEDSERVICES');
        }
      });
  }

  resetForm(part: string) {
    switch (true) {
      case part === 'CONSTRACTMARCO':
        // actualizar formulario
        this.formCubicacion.get('proveedor_id').reset();
        this.formCubicacion.get('region_id').reset();
        break;
      case part === 'SUBCONTRACTEDPROVIDERS':
        // actualizar formulario
        this.formCubicacion.get('region_id').reset();
        break;
      case part === 'SUBCONTRACTEDPROVIDERS':
        // actualizar formulario
        this.formCubicacion.get('region_id').reset();
        break;
    }
  }

  selected(items: SubContractedServices[]) {
    console.log('items:::::');
    console.log(items);
    console.log('items:::::');
  }

  cancel(data: any) {
    this.initForm();
  }

  save(data: any) {
    const form = this.formCubicacion.value;
    form.id = (+(new Date())).toString();
    // this.cubageFacade.replyOt(form);
    this.formCubicacion.reset();
  }

}
