import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
  ViewEncapsulation,
} from '@angular/core';
import { observable, Observable, of, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { map, take, tap } from 'rxjs/operators';

import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { BaseFacade } from '@storeOT/features/base/base.facade';

import { FormCubService } from './form-cub.service';

import {
  Actividad4Cub,
  Agencias4Cub,
  ContratosUser,
  Proveedores4Cub,
  RequestGetServicios4Cub,
  RequestGetUnidadObra4Cub,
  SelectType,
  Servicios4Cub,
  SessionData,
  TipoCubicacion4Cub,
  TipoServicioEspecialidad4Cub,
  UnidadObra4Cub,
} from '@data';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-cub',
  templateUrl: './form-cub.component.html',
  styleUrls: ['./form-cub.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormCubContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  // DATOS A USAR
  loginData$: Observable<SessionData>;
  tipoCubicacion4Cub$: Observable<TipoCubicacion4Cub[]> = of([]);
  contratosUser4Cub$: Observable<ContratosUser[]>;
  agencias4Cub$: Observable<Agencias4Cub[]> = of([]);
  proveedores4Cub$: Observable<Proveedores4Cub[]> = of([]);
  proveedores: Proveedores4Cub[] = [];

  actividad4Cub$: Observable<Actividad4Cub[]> = of([]);
  tipoServicioEspecialidad4Cub$: Observable<TipoServicioEspecialidad4Cub[]> =
    of([]);
  servicios4Cub$: Observable<SelectType[]> = of([]);
  servicios: Servicios4Cub[];
  unidadObra4Cub$: Observable<SelectType[]> = of([]);
  uobs: UnidadObra4Cub[];

  // FORMULARIO
  formControls: any;
  formFiltrosControls: any;
  formCub: FormGroup;
  formFiltros: FormGroup;

  // EXTRAS
  // SI EL MODE ES 'EDIT' ENTONCES SE DESPLIEGA UNA PANTALLA EN NEGRO HASTA QUE SE CARGEN TODOS LOS DATOA A EDITAR
  loading$: Observable<boolean>;
  loading_interno = false;
  mode = 'add';

  usuario_id = null;

  totalServicio = 0;
  totalUO = 0;

  constructor(
    private cubicacionFacade: CubicacionFacade,
    private authFacade: AuthFacade,
    private baseFacade: BaseFacade,
    private router: Router,
    private formcubService: FormCubService
  ) {}

  ngOnInit(): void {
    this.onInitReset();
    this.onInitGetData();
    this.onInitForm();
    this.onInitSetData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onInitReset(): void {
    this.cubicacionFacade.resetData();
    this.totalServicio = 0;
    this.totalUO = 0;
  }

  onInitGetData(): void {
    this.baseFacade.loading(true);
    this.loginData$ = this.authFacade.getLogin$().pipe(take(1));
    this.subscription.add(
      this.loginData$.subscribe(loginAuth => {
        if (
          loginAuth?.token === undefined &&
          loginAuth?.proxy_id === undefined
        ) {
          this.router.navigate(['/auth/login']);
        } else {
          this.usuario_id = loginAuth.usuario_id;
          this.cubicacionFacade.contratosUser4Cub(+loginAuth.usuario_id);
          this.cubicacionFacade.tipoCubicacion4cub();
          this.cubicacionFacade.actividad4cub();
        }
      })
    );
  }

  onInitForm(): void {
    this.formControls = this.formcubService.FormConfig();
    this.formFiltrosControls = this.formcubService.FormFilterConfig();
    this.formCub = new FormGroup(this.formControls);
    this.formFiltros = new FormGroup(this.formFiltrosControls);
    this.formCub.get('agencia_id').disable({ emitEvent: false });
    this.formCub.get('cmarcoproveedor_id').disable({ emitEvent: false });
    this.resetFiltrosServicio();

    this.subscription.add(
      this.formCub.get('contrato').valueChanges.subscribe(contrato_id => {
        if (contrato_id !== null && contrato_id !== undefined) {
          this.formReset(this.formCub, ['agencia_id', 'cmarcoproveedor_id']);
          this.resetFiltrosServicio();
          this.cubicacionFacade.agencias4cub(+contrato_id);
        } else {
          this.checkAndEnable(this.formCub, 'agencia_id', []);
        }
      })
    );

    this.subscription.add(
      this.formCub.get('agencia_id').valueChanges.subscribe(agencia_id => {
        if (agencia_id !== null && agencia_id !== undefined) {
          this.formCub.get('cmarcoproveedor_id').reset();
          this.resetFiltrosServicio();
          this.cubicacionFacade.proveedores4Cub(
            +agencia_id,
            +this.formCub.get('contrato').value
          );
        } else {
          this.checkAndEnable(this.formCub, 'cmarcoproveedor_id', []);
        }
      })
    );

    this.subscription.add(
      this.formCub
        .get('cmarcoproveedor_id')
        .valueChanges.subscribe(cmarcoproveedor_id => {
          if (cmarcoproveedor_id !== null && cmarcoproveedor_id !== undefined) {
            this.resetFiltrosServicio();
            this.formFiltros.get('actividad_id').enable();
          } else {
            this.checkAndEnable(this.formFiltros, 'actividad_id', []);
          }
        })
    );

    // FORM FILTROS

    this.subscription.add(
      this.formFiltros
        .get('actividad_id')
        .valueChanges.subscribe(actividad_id => {
          if (actividad_id !== null && actividad_id !== undefined) {
            this.formReset(this.formFiltros, [
              'tipo_servicio_id',
              'servicio_id',
              'unidad_obra_cod',
            ]);
            this.cubicacionFacade.tipoServicioEspecialidad(+actividad_id);
          } else {
            // this.checkAndEnable('cmarcoproveedor_id', []);
          }
        })
    );

    this.subscription.add(
      this.formFiltros
        .get('tipo_servicio_id')
        .valueChanges.subscribe(tipo_servicio_id => {
          if (tipo_servicio_id !== null && tipo_servicio_id !== undefined) {
            this.formFiltros.get('servicio_id').reset();
            const cmarco_has_prov_id =
              +this.formCub.get('cmarcoproveedor_id').value;
            const agencia_id = +this.formCub.get('agencia_id').value;
            const request: RequestGetServicios4Cub = {
              agencia_id,
              cmarco_has_prov_id,
              tipo_servicio_id: +tipo_servicio_id,
            };
            // console.log(request);
            this.cubicacionFacade.servicios4Cub(request);
          } else {
            this.checkAndEnable(this.formFiltros, 'servicio_id', []);
          }
        })
    );

    this.subscription.add(
      this.formFiltros
        .get('servicio_id')
        .valueChanges.subscribe(servicio_id => {
          const actividad_id = +this.formFiltros.get('actividad_id').value;
          if (
            servicio_id !== null &&
            servicio_id !== undefined &&
            actividad_id !== null
          ) {
            const servicio_form = this.formFiltros.get('servicio_id').value;
            const servicio_cod = this.servicios.find(
              servicio => servicio.id === +servicio_form.code
            ).codigo;
            this.formFiltros.get('unidad_obra_cod').reset();
            const request: RequestGetUnidadObra4Cub = {
              servicio_cod,
              actividad_id,
            };
            this.cubicacionFacade.unidadObras4Cub(request);
          } else {
            this.checkAndEnable(this.formFiltros, 'unidad_obra_cod', []);
          }
        })
    );
  }

  onInitSetData(): void {
    this.tipoCubicacion4Cub$ = this.cubicacionFacade.tipoCubicacion4cub$();

    // .pipe(
    //   map(tipos_cub => {
    //     return tipos_cub.map(tipo_cub => ({
    //       name: tipo_cub.descripcion,
    //       code: tipo_cub.id.toString(),
    //     }));
    //   })
    // );
    this.contratosUser4Cub$ = this.cubicacionFacade.contratosUser4Cub$();
    this.agencias4Cub$ = this.cubicacionFacade
      .agencias4cub$()
      .pipe(
        tap(agencias =>
          this.checkAndEnable(this.formCub, 'agencia_id', agencias)
        )
      );
    this.proveedores4Cub$ = this.cubicacionFacade.proveedores4Cub$().pipe(
      map(proveedores => {
        this.proveedores = proveedores;
        return proveedores;
      }),
      tap(proveedores =>
        this.checkAndEnable(this.formCub, 'cmarcoproveedor_id', proveedores)
      )
    );

    this.actividad4Cub$ = this.cubicacionFacade.actividad4cub$();
    this.tipoServicioEspecialidad4Cub$ = this.cubicacionFacade
      .tipoServicioEspecialidad$()
      .pipe(
        tap(tiposervicio =>
          this.checkAndEnable(
            this.formFiltros,
            'tipo_servicio_id',
            tiposervicio
          )
        )
      );
    this.servicios4Cub$ = this.cubicacionFacade.servicios4Cub$().pipe(
      map(servicios => {
        this.servicios = servicios;
        return servicios.map(servicio => ({
          name: `${servicio.numero_producto} - ${servicio.descripcion}`,
          code: servicio.id.toString(),
        }));
      }),
      tap(servicios =>
        this.checkAndEnable(this.formFiltros, 'servicio_id', servicios)
      )
    );
    this.unidadObra4Cub$ = this.cubicacionFacade.unidadObras4Cub$().pipe(
      map(uobs => {
        this.uobs = uobs;
        return uobs.map(uob => ({
          name: `${uob.unidad_obra_cod} - ${uob.model_unidad_obra_cod.descripcion}`,
          code: uob.id.toString(),
        }));
      }),
      tap(unidadobras =>
        this.checkAndEnable(this.formFiltros, 'unidad_obra_cod', unidadobras)
      )
    );
  }

  checkAndEnable(form: FormGroup, key: string, array: any[]): void {
    if (array.length > 0) {
      form.get(key).enable({ emitEvent: false });
    } else {
      form.get(key).disable({ emitEvent: false });
    }
  }

  goBack(): void {
    this.cubicacionFacade.resetData();
    this.router.navigate(['/app/cubicacion/list-cub']);
  }

  formReset(form: FormGroup, controlNames: string[]): void {
    controlNames.forEach(control => form.get(control).reset());
  }

  resetFiltrosServicio(): void {
    this.formFiltros.get('tipo_servicio_id').disable({ emitEvent: false });
    this.formFiltros.get('actividad_id').disable({ emitEvent: false });
    this.formFiltros.get('servicio_id').disable({ emitEvent: false });
    this.formFiltros.get('unidad_obra_cod').disable({ emitEvent: false });
    this.formFiltros.get('tipo_servicio_id').reset();
    this.formFiltros.get('actividad_id').reset();
    this.formFiltros.get('servicio_id').reset();
    this.formFiltros.get('unidad_obra_cod').reset();
  }

  get values(): any {
    return this.formCub ? this.formCub.getRawValue() : null;
  }
}
