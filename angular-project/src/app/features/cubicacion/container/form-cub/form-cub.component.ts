import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import {
  ContractMarco,
  Cubicacion,
  SubContractedProviders,
  SubContractedRegions,
  SubContractedServices,
  SubContractedTypeServices,
} from '@storeOT/features/cubicacion/cubicacion.model';
import { MessageService } from 'primeng/api';
import { Observable, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-form-cub',
  templateUrl: './form-cub.component.html',
  styleUrls: ['./form-cub.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCubComponent implements OnInit, OnDestroy {
  // declarations
  public lpus = [];
  public authLogin = null;
  public providers = null;
  public formCubicacion: FormGroup;
  public constractMarco$: Observable<ContractMarco[]>;
  public subContractedProviders: SubContractedProviders[];
  public subContractedProviders$: Observable<SubContractedProviders[]> = of([]);
  public subContractedRegions: SubContractedRegions[];
  public subContractedRegions$: Observable<SubContractedRegions[]> = of([]);
  public subContractedTypeServices: SubContractedTypeServices[];
  public subContractedTypeServices$: Observable<SubContractedTypeServices[]> =
    of([]);
  public subContractedServices: SubContractedServices[];
  public subContractedServices$: Observable<SubContractedServices[]> = of();
  private destroyInstance$: Subject<boolean> = new Subject();

  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacade,
    private cubageFacade: CubicacionFacade,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // inicializamos formulario reactivo
    this.initForm();

    // rescatamos data inicial
    this.constractMarco$ = this.cubageFacade.getContractMarco$();
    this.subContractedProviders$ = this.cubageFacade
      .getSubContractedProviders$()
      .pipe(map((providers) => (this.providers = providers)));
    this.subContractedRegions$ = this.cubageFacade.getSubContractedRegions$();
    this.subContractedTypeServices$ =
      this.cubageFacade.getSubContractedTypeServices$();
    this.subContractedServices$ = this.cubageFacade.getSubContractedServices$();

    // traemos contratos des api mediante efectos
    this.authFacade
      .getLogin$()
      .pipe(takeUntil(this.destroyInstance$))
      .subscribe((authLogin) => {
        if (authLogin) {
          // asignamos datos de usuario autenticado a variable local
          this.authLogin = authLogin;

          // rescatamos contratos marco desde api
          this.cubageFacade.getContractMarco({
            token: authLogin.token,
            usuario_id: authLogin.usuario_id,
          });
        }
      });
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
    });

    // detectamos cambios en formulario
    this.detectChangesForm();
  }

  detectChangesForm(): void {
    this.formCubicacion
      .get('contrato_marco_id')
      .valueChanges.pipe(takeUntil(this.destroyInstance$))
      .subscribe((contrato_marco_id) => {
        if (contrato_marco_id) {
          console.log('DENTRO contrato_marco_id...');
          // actualizamos store para
          // SubContractedProviders según ConstractMarco
          this.cubageFacade.getSubContractedProviders({
            token: this.authLogin.token,
            contrato_marco_id: +contrato_marco_id,
          });

          // refrescamos parte de
          //  formulario al cambiar ConstractMarco
          // this.resetForm('CONSTRACTMARCO');
        }
      });

    this.formCubicacion
      .get('proveedor_id')
      .valueChanges.pipe(takeUntil(this.destroyInstance$))
      .subscribe((proveedor_id) => {
        if (proveedor_id) {
          console.log('DENTRO proveedor_id...');
          // actualizamos store para
          // SubContractedProviders según ConstractMarco
          this.cubageFacade.getSubContractedRegions({
            token: this.authLogin.token,
            subcontrato_id: +proveedor_id,
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
          console.log('DENTRO region_id...');
          // actualizamos store
          // const provider = this.providers.find(p => +p.id === +this.formCubicacion.value.proveedor_id);
          this.cubageFacade.getSubContractedTypeServices({
            token: this.authLogin.token,
            subcontrato_id: 3,
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
          this.cubageFacade.getSubContractedServices({
            token: this.authLogin.token,
            subcontrato_id: 3,
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

  selected(items: SubContractedServices[]): void {
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

    const subcontrato = this.providers.find(
      (c) => +c.id === +form.proveedor_id
    );

    const cubage = {
      token: this.authLogin.token,
      // cubicacion_id: +form.cubicacion_id,
      cubicacion_nombre: form.nombre,
      total: 10000,
      region_id: +form.region_id,
      usuario_id: +this.authLogin.usuario_id,
      contrato_marco_id: +form.contrato_marco_id,
      proveedor_id: +form.proveedor_id,
      subcontrato_id: subcontrato ? +subcontrato.subcontrato_id[0] : null,
      lpus: this.lpus.map((lpu) => {
        const lpuCUstom = {
          lpu_id: lpu.lpu_id,
          cantidad: 2,
        };
        return lpuCUstom;
      }),
    };

    this.cubageFacade.replyCubicacion(cubitation);
    this.cubageFacade.postCubicacion(cubage);
    this.cubageFacade.resetData();
    this.reset();
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
}
