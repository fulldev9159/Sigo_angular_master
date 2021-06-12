import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import * as CubModel from '@storeOT/features/cubicacion/cubicacion.model';
import { MessageService } from 'primeng/api';
import { Observable, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Login } from '@storeOT/features/auth/auth.model';
@Component({
  selector: 'app-form-cub-container',
  templateUrl: './form-cub-container.component.html',
  styleUrls: ['./form-cub-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCubContainerComponent implements OnInit, OnDestroy {
  public lpus: CubModel.SubContractedServices[] = [];
  public authLogin: Login = null;
  public providers = null;
  public formCubicacion: FormGroup;
  public constractMarco$: Observable<CubModel.ContractMarco[]>;
  public subContractedProviders$: Observable<
    CubModel.SubContractedProviders[]
  > = of([]);
  public subContractedRegions$: Observable<CubModel.SubContractedRegions[]> =
    of([]);
  public subContractedTypeServices$: Observable<
    CubModel.SubContractedTypeServices[]
  > = of([]);
  public subContractedServices$: Observable<CubModel.SubContractedServices[]> =
    of();
  public autoSuggest$: Observable<CubModel.AutoSuggestForm[]> = of();
  private destroyInstance$: Subject<boolean> = new Subject();

  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacade,
    private cubageFacade: CubicacionFacade,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // traemos contratos des api mediante efectos
    this.authFacade
      .getLogin$()
      .pipe(takeUntil(this.destroyInstance$))
      .subscribe((authLogin) => {
        if (authLogin) {
          // asignamos datos de usuario autenticado a variable local
          this.authLogin = authLogin;
        }
      });

    this.initForm();
    this.constractMarco$ = this.cubageFacade.getContractMarcoSelector$();
    this.subContractedProviders$ =
      this.cubageFacade.getSubContractedProvidersSelector$();
    this.subContractedRegions$ =
      this.cubageFacade.getSubContractedRegionsSelector$();
    this.subContractedTypeServices$ =
      this.cubageFacade.getSubContractedTypeServicesSelector$();
    this.subContractedServices$ =
      this.cubageFacade.getSubContractedServicesSelector$();
    this.autoSuggest$ = this.cubageFacade.getAutoSuggestSelector$();
    this.cubageFacade.getContractMarcoAction();
    this.cubageFacade.getAutoSuggestAction('', 5);
  }

  ngOnDestroy(): void {
    this.destroyInstance$.next(true);
    this.destroyInstance$.complete();
  }

  initForm(): void {
    this.formCubicacion = this.fb.group({
      cubicacion_id: null,
      cubicacion_nombre: null,
      total: 0,
      nombre: [null, Validators.required],
      fecha_creacion: null,
      usuario_id: null,
      usuario_nombre: null,
      region_id: [null, Validators.required],
      region_nombre: null,
      contrato_marco_id: [null, Validators.required],
      contrato_marco_nombre: null,
      proveedor_id: [null, Validators.required],
      proveedor_nombre: null,
      subcontrato_id: null,
      asignado: null,
      adm_contrato_nombre: null,
      lpus: [],
      tipo_servicio_id: null,
      // tickets:new FormArray([])
    });
    this.detectChangesForm();
  }

  detectChangesForm(): void {
    this.formCubicacion
      .get('contrato_marco_id')
      .valueChanges.pipe(takeUntil(this.destroyInstance$))
      .subscribe((contrato_marco_id) => {
        if (contrato_marco_id) {
          this.cubageFacade.getSubContractedProvidersAction({
            contrato_marco_id: +contrato_marco_id,
          });

          // refrescamos parte de
          //  formulario al cambiar ConstractMarco
          // this.resetForm('CONSTRACTMARCO');
        }
      });

    this.formCubicacion
      .get('subcontrato_id')
      .valueChanges.pipe(takeUntil(this.destroyInstance$))
      .subscribe((subcontratoId) => {
        if (subcontratoId) {
          console.log(subcontratoId);
          const [subcontratos, proveedor] = subcontratoId.split('-');
          const idProve = 'proveedor_id';
          const idsubCon = 'subcontrato_id';
          this.formCubicacion.controls[idProve].setValue(+proveedor);
          // this.formCubicacion.controls[idsubCon].setValue(subcontratos)
          this.cubageFacade.getSubContractedRegionsAction({
            subcontrato_id: subcontratos.split(',').map((x) => +x),
          });

          // refrescamos parte de
          //  formulario al cambiar SubContractedProviders
          // this.resetForm('SUBCONTRACTEDPROVIDERS');
        }
      });

    this.formCubicacion
      .get('region_id')
      .valueChanges.pipe(takeUntil(this.destroyInstance$))
      .subscribe((region_id) => {
        if (region_id) {
          // actualizamos store
          // const provider = this.providers.find(p => +p.id === +this.formCubicacion.value.proveedor_id);
          const [subcontratos, proveedor] =
            this.formCubicacion.value.subcontrato_id.split('-');
          this.cubageFacade.getSubContractedTypeServicesAction({
            subcontrato_id: subcontratos.split(',').map((x) => +x),
            region_id: +region_id,
          });

          // refrescamos parte de
          //  formulario al cambiar SubContractedProviders
          // this.resetForm('SUBCONTRACTEDTYPESERVICES');
        }
      });

    this.formCubicacion
      .get('tipo_servicio_id')
      .valueChanges.pipe(takeUntil(this.destroyInstance$))
      .subscribe((tipo_servicio_id) => {
        if (tipo_servicio_id) {
          // actualizamos store
          const [subcontratos, proveedor] =
            this.formCubicacion.value.subcontrato_id.split('-');
          this.cubageFacade.getSubContractedServicesAction({
            subcontrato_id: subcontratos.split(',').map((x) => +x),
            region_id: +this.formCubicacion.value.region_id,
            tipo_servicio_id: +tipo_servicio_id,
          });

          // refrescamos parte de
          // this.resetForm('SUBCONTRACTEDSERVICES');
        }
      });
  }

  resetForm(part: string): void {
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

  selected(items: CubModel.SubContractedServices[]): void {
    this.lpus = items;
  }

  cancel(data: any): void {
    this.initForm();
  }

  save(data: any): void {
    const form = this.formCubicacion.value;
    form.id = (+new Date()).toString();
    form.lpus = this.lpus;
    const cubitation = {
      id: form.id,
      nombre: form.nombre,
      total: form.total,
      fecha_creacion: new Date().toString(),
      usuario_id: this.authLogin.usuario_id,
      usuario_nombre: this.authLogin.usuario_nombre,
      region_id: form.region_id,
      region_nombre: null,
      contrato_marco_nombre: null,
      proveedor_id: form.proveedor_id,
      proveedor_nombre: null,
      subcontrato_id: form.subcontrato_id,
    };

    // const subcontrato = this.providers.find(
    //   (c) => +c.id === +form.proveedor_id
    // );
    const [subcontratos, proveedor] = form.subcontrato_id.split('-');
    const idProve = 'proveedor_id';
    const cubage = {
      // cubicacion_id: +form.cubicacion_id,
      cubicacion_nombre: form.nombre,
      total: 10000,
      region_id: +form.region_id,
      usuario_id: +this.authLogin.usuario_id,
      contrato_marco_id: +form.contrato_marco_id,
      proveedor_id: +form.proveedor_id,
      subcontrato_id: 1,
      lpus: this.lpus.map((x) => ({
        lpu_id: x.lpu_id,
        cantidad: x.cantidad,
      })),
    };
    this.cubageFacade.replyCubicacion(cubitation);
    this.cubageFacade.postCubicacion(cubage);
    this.formCubicacion.reset();
    this.cubageFacade.resetData();
    this.router.navigate(['app/cubicacion/list-cub']);
    this.messageService.add({
      severity: 'success',
      summary: 'Registro guardado',
      detail: 'Registro se ha generado con Éxito!',
    });
  }

  reset(): void {
    this.cubageFacade.resetData();
  }

  ChangeSearch(filter: string): void {
    console.log(filter);
    const idNombre = 'nombre';
    this.formCubicacion.controls[idNombre].setValue(filter);
    this.cubageFacade.getAutoSuggestAction(filter, 5);
  }
}
