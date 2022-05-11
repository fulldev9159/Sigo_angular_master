import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Subscription, BehaviorSubject, of, Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { GeneralFormComponent } from '../../forms/general-form/general-form.component';
import { PlanProyectoFormComponent } from '../../forms/plan-proyecto-form/plan-proyecto-form.component';
import { SustentoFinancieroFormComponent } from '../../forms/sustento-financiero-form/sustento-financiero-form.component';
import { ExtrasFormComponent } from '../../forms/extras-form/extras-form.component';
import { NumeroInternoFormComponent } from '../../forms/numero-interno-form/numero-interno-form.component';
import { DetalleAdjudicacionFormComponent } from '../../forms/detalle-adjudicacion-form/detalle-adjudicacion-form.component';
import {
  Cubicacion,
  Cubs4OT,
  SessionData,
  Sitio,
  RequestCreateOTMovil,
  RequestCreateOTBucle,
  RequestCreateOTOrdinario,
  RequestCreateOTFijo,
} from '@data';
import { BucleFormComponent } from '@featureOT/ot/forms/bucle-form/bucle-form.component';

@Component({
  selector: 'app-form-ot',
  templateUrl: './form-ot.component.html',
  styleUrls: ['./form-ot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormOtComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  // DATOS A USAR
  contractType$ = new BehaviorSubject<string>('');
  cubicacionSeleccionada: Cubs4OT = null;

  // DISPLAY MODALS

  // FORMULARIO

  // TABLE

  // EXTRAS

  authLogin: SessionData = null;

  sitioSeleccionado: Sitio = null;
  nombre_plan_proyecto: string;

  saving$: Observable<boolean> = of(false);
  savingError$: Observable<Error> = of(null);

  @ViewChild('generalForm', {
    read: GeneralFormComponent,
    static: false,
  })
  generalForm: GeneralFormComponent;

  @ViewChild('planProyectoForm', {
    read: PlanProyectoFormComponent,
    static: false,
  })
  planProyectoForm: PlanProyectoFormComponent;

  @ViewChild('sustentoFinancieroForm', {
    read: SustentoFinancieroFormComponent,
    static: false,
  })
  sustentoFinancieroForm: SustentoFinancieroFormComponent;

  @ViewChild('extrasForm', {
    read: ExtrasFormComponent,
    static: false,
  })
  extrasForm: ExtrasFormComponent;

  @ViewChild('numeroInternoForm', {
    read: NumeroInternoFormComponent,
    static: false,
  })
  numeroInternoForm: NumeroInternoFormComponent;

  @ViewChild('detalleAdjudicacionForm', {
    read: DetalleAdjudicacionFormComponent,
    static: false,
  })
  detalleAdjudicacionForm: DetalleAdjudicacionFormComponent;

  @ViewChild('bucleForm', {
    read: BucleFormComponent,
    static: false,
  })
  bucleForm: BucleFormComponent;

  form: FormGroup = new FormGroup({
    general: new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        this.noWhitespace,
        Validators.maxLength(255),
      ]),
      contrato: new FormControl(null, [Validators.required]),
      cubicacion_id: new FormControl(null, [Validators.required]),
    }),
    planProyecto: new FormGroup({
      plan_proyecto_id: new FormControl(null, [Validators.required]),
      sitio_id: new FormControl(null, [Validators.required]),
    }),
    sustentoFinanciero: new FormGroup({
      costos: new FormControl('capex', []),

      pmo_codigo: new FormControl(null, []),
      lp_codigo: new FormControl(null, []),
      pep2_capex_id: new FormControl(null, []),
      pep2_provisorio: new FormControl(null, []),

      id_opex_codigo: new FormControl(null, []),
      cuenta_sap_codigo: new FormControl(null, []),
      ceco_codigo: new FormControl(null, []),
      ceco_provisorio: new FormControl(null, []),
    }),
    extras: new FormGroup({
      fecha_inicio: new FormControl(null, [Validators.required]),
      fecha_fin: new FormControl(null, [Validators.required]),
      proyecto_id: new FormControl(null, []),
      observaciones: new FormControl(null, []),
      admin_contrato_id: new FormControl(null, []),
    }),
    numeroInterno: new FormGroup({
      tipo_numero_interno_id: new FormControl(null, [Validators.required]),
      // numeros_internos: new FormArray([]),
      numero_interno: new FormControl([]),
    }),
    detalleAdjudicacion: new FormGroup({
      carta_adjudicacion: new FormControl(null, [
        Validators.required,
        this.noWhitespace,
        Validators.maxLength(255),
      ]),
      fecha_adjudicacion: new FormControl(null, [Validators.required]),
      numero_pedido: new FormControl(null, [
        Validators.required,
        this.noWhitespace,
        Validators.maxLength(255),
      ]),
      materia: new FormControl(null, [
        Validators.required,
        this.noWhitespace,
        Validators.maxLength(255),
      ]),
    }),
    bucle: new FormGroup({
      oficina_central_id: new FormControl(null, [Validators.required]),
      solicitante_id: new FormControl(null, [Validators.required]),
      direccion: new FormControl(null, [
        Validators.required,
        this.noWhitespace,
        Validators.maxLength(255),
      ]),
      altura: new FormControl(null, [
        Validators.required,
        this.noWhitespace,
        Validators.maxLength(255),
      ]),
      piso: new FormControl(null, [
        Validators.required,
        this.noWhitespace,
        Validators.maxLength(255),
      ]),
      departamento: new FormControl(null, [
        Validators.required,
        this.noWhitespace,
        Validators.maxLength(255),
      ]),
      comuna_id: new FormControl(null, [Validators.required]),
      tipo_red_id: new FormControl(null, [Validators.required]),
      tipo_trabajo_id: new FormControl(null, [Validators.required]),
      tiene_boleta_garantia: new FormControl(false, [Validators.required]),
      tiene_permisos: new FormControl(false, [Validators.required]),
      area_negocio: new FormControl(null, [
        Validators.required,
        this.noWhitespace,
        Validators.maxLength(255),
      ]),
      nombre_proyectista: new FormControl(null, [
        Validators.required,
        this.noWhitespace,
        Validators.maxLength(255),
      ]),
    }),
  });

  noWhitespace(control: FormControl): any {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private otFacade: OtFacade,
    private cubageFacade: CubicacionFacade,
    private authFacade: AuthFacade,
    private detector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.otFacade.resetData();
    // this.subscription.add(
    //   this.otFacade.getNumeroInternoHasOT$().subscribe(() => {
    //     this.detector.detectChanges();
    //   })
    // );

    this.subscription.add(
      this.form
        .get('general')
        .get('cubicacion_id')
        .valueChanges.pipe(withLatestFrom(this.otFacade.cubicaciones4OT$()))
        .subscribe(([cubicacion_id, cubicaciones]) => {
          this.resetPlanProyectoFormControl();

          this.cubicacionSeleccionada = null;
          this.otFacade.cubicacionSeleccionada(null);
          if (cubicacion_id !== null && cubicacion_id !== undefined) {
            this.cubicacionSeleccionada = cubicaciones.find(
              cubicacion => +cubicacion.cubicacion_id === +cubicacion_id
            );
            this.otFacade.cubicacionSeleccionada(this.cubicacionSeleccionada);
            this.otFacade.getAdminContrato(+cubicacion_id);
            if (this.cubicacionSeleccionada) {
              // TODO: checkear el tipo contrato de la cubicacion
              console.log(
                this.cubicacionSeleccionada.tipo_contrato_marco_nombre
              );
              const contractType =
                this.cubicacionSeleccionada.tipo_contrato_marco_nombre;

              // TODO descomentar ésto cuando la obtención del tipo de contrato sea dinámica
              if (
                contractType === 'Fijo' ||
                contractType === 'Ordinario' ||
                contractType === 'Bucle'
              ) {
                // TODO: se necesita obtener el listado de PMOs sin especificar un sitio
                this.otFacade.getPMO('');
              }
              this.contractType$.next(contractType);
            }
          } else {
            this.disablePlanProyectoFormControl();
          }
        })
    );

    // this.subscription.add(
    //   this.form
    //     .get('planProyecto')
    //     .get('plan_proyecto_id')
    //     .valueChanges.pipe(
    //       withLatestFrom(
    //         this.otFacade.getPlans$().pipe(map(planes => planes || []))
    //       )
    //     )
    //     .subscribe(([plan_proyecto_id, planes]) => {
    //       this.nombre_plan_proyecto = null;
    //       if (plan_proyecto_id !== null && plan_proyecto_id !== undefined) {
    //         const plan = planes.find(p => +p.id === +plan_proyecto_id);
    //         if (plan) {
    //           this.nombre_plan_proyecto = plan.nombre;
    //         }
    //       }
    //     })
    // );

    this.subscription.add(
      this.form
        .get('planProyecto')
        .get('sitio_id')
        .valueChanges.pipe(
          withLatestFrom(
            this.otFacade.getSitio$().pipe(map(sitios => sitios || []))
          )
        )
        .subscribe(([sitio_id, sitios]) => {
          this.resetPMOCodigoFormControl();
          if (sitio_id !== null && sitio_id !== undefined) {
            this.sitioSeleccionado = sitios.find(s => +s.id === +sitio_id);

            if (this.sitioSeleccionado) {
              this.otFacade.getPMO(this.sitioSeleccionado.codigo);
            }
          } else {
            this.disablePMOCodigoFormControl();
          }
        })
    );

    this.subscription.add(
      this.authFacade.getLogin$().subscribe(profile => {
        if (profile) {
          this.authLogin = profile;
        }
      })
    );

    this.saving$ = this.otFacade.getSavingOT$();
    this.savingError$ = this.otFacade.getSaveOTError$();
  }

  resetPlanProyectoFormControl(): void {
    this.form.get('planProyecto').get('plan_proyecto_id').reset();
    this.otFacade.resetPlanProyecto();
  }

  disablePlanProyectoFormControl(): void {
    this.form
      .get('planProyecto')
      .get('plan_proyecto_id')
      .disable({ emitEvent: false });
  }

  resetPMOCodigoFormControl(): void {
    this.form.get('sustentoFinanciero').get('pmo_codigo').reset();
    this.otFacade.resetPMO();
  }

  disablePMOCodigoFormControl(): void {
    this.form
      .get('sustentoFinanciero')
      .get('pmo_codigo')
      .disable({ emitEvent: false });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goBack(): void {
    this.otFacade.resetData();
    this.cubicacionSeleccionada = null;
    // this.nombre_plan_proyecto = '';
    this.sitioSeleccionado = null;
    this.router.navigate(['/app/ot/list-ot']);
  }

  cancel(): void {
    // this.initForm(});
    this.otFacade.resetData();
    this.router.navigate(['app/ot/list-ot']);
  }

  touch(): void {
    const contractType = this.contractType$.value;

    if (contractType === 'Móvil') {
      if (
        this.generalForm &&
        this.planProyectoForm &&
        this.sustentoFinancieroForm &&
        this.extrasForm
      ) {
        this.generalForm.touch();
        this.planProyectoForm.touch();
        this.sustentoFinancieroForm.touch();
        this.extrasForm.touch();
      }
    } else if (contractType === 'Fijo') {
      if (
        this.generalForm &&
        this.numeroInternoForm &&
        this.sustentoFinancieroForm &&
        this.extrasForm
      ) {
        this.generalForm.touch();
        this.numeroInternoForm.touch();
        this.sustentoFinancieroForm.touch();
        this.extrasForm.touch();
      }
    } else if (contractType === 'Ordinario') {
      if (
        this.generalForm &&
        this.detalleAdjudicacionForm &&
        this.sustentoFinancieroForm &&
        this.extrasForm
      ) {
        this.generalForm.touch();
        this.detalleAdjudicacionForm.touch();
        this.sustentoFinancieroForm.touch();
        this.extrasForm.touch();
      }
    } else if (contractType === 'Bucle') {
      if (
        this.generalForm &&
        this.bucleForm &&
        this.sustentoFinancieroForm &&
        this.extrasForm
      ) {
        this.generalForm.touch();
        this.bucleForm.touch();
        this.sustentoFinancieroForm.touch();
        this.extrasForm.touch();
      }
    }
  }

  get valid(): boolean {
    const contractType = this.contractType$.value;

    if (contractType === 'Móvil') {
      if (
        this.generalForm &&
        this.planProyectoForm &&
        this.sustentoFinancieroForm &&
        this.extrasForm
      ) {
        return (
          this.generalForm.valid &&
          this.planProyectoForm.valid &&
          this.sustentoFinancieroForm.valid &&
          this.extrasForm.valid
        );
      }
    } else if (contractType === 'Fijo') {
      if (
        this.generalForm &&
        this.numeroInternoForm &&
        this.sustentoFinancieroForm &&
        this.extrasForm
      ) {
        return (
          this.generalForm.valid &&
          this.numeroInternoForm.valid &&
          this.sustentoFinancieroForm.valid &&
          this.extrasForm.valid
        );
      }
    } else if (contractType === 'Ordinario') {
      if (
        this.generalForm &&
        this.detalleAdjudicacionForm &&
        this.sustentoFinancieroForm &&
        this.extrasForm
      ) {
        return (
          this.generalForm.valid &&
          this.detalleAdjudicacionForm.valid &&
          this.sustentoFinancieroForm.valid &&
          this.extrasForm.valid
        );
      }
    } else if (contractType === 'Bucle') {
      if (
        this.generalForm &&
        this.bucleForm &&
        this.sustentoFinancieroForm &&
        this.extrasForm
      ) {
        return (
          this.generalForm.valid &&
          this.bucleForm &&
          this.sustentoFinancieroForm.valid &&
          this.extrasForm.valid
        );
      }
    }

    return false;
  }

  save(): void {
    this.touch();
    if (this.valid) {
      const contractType = this.contractType$.value;

      if (contractType === 'Móvil') {
        this.saveMovilForm();
      } else if (contractType === 'Fijo') {
        this.saveFijoForm();
      } else if (contractType === 'Ordinario') {
        this.saveOrdinarioForm();
      } else if (contractType === 'Bucle') {
        this.saveBucleForm();
      }
    }
  }

  saveMovilForm(): void {
    const {
      general: { nombre, tipo, cubicacion_id },
      planProyecto: { plan_proyecto_id, sitio_id },
      sustentoFinanciero: {
        costos,

        pmo_codigo,
        lp_codigo,
        pep2_capex_id,
        pep2_provisorio,

        id_opex_codigo,
        cuenta_sap_codigo,
        ceco_codigo,
        ceco_provisorio,
      },
      extras: {
        fecha_inicio,
        fecha_fin,
        proyecto_id,
        observaciones,
        admin_contrato_id,
      },
    } = this.form.getRawValue();

    const request: RequestCreateOTMovil = {
      ot_datos: {
        adm_contrato_proxy_id: +admin_contrato_id,
        proyecto_id: proyecto_id === null ? null : +proyecto_id,
        nombre: nombre.trim(),
        cubicacion_id: +cubicacion_id,
        observaciones: observaciones.trim(),
        fecha_inicio,
        fecha_fin,
        tipo_sustento: costos.toUpperCase(),
        es_sustento_provisorio:
          costos.toUpperCase() === 'CAPEX' ? pep2_provisorio : ceco_provisorio,
        pmo_codigo: costos.toUpperCase() === 'CAPEX' ? +pmo_codigo : pmo_codigo,
        id_opex: id_opex_codigo,
        lp: lp_codigo,
        cuenta_sap:
          costos.toUpperCase() === 'CAPEX'
            ? cuenta_sap_codigo
            : +cuenta_sap_codigo,
        pep2: pep2_capex_id,
        ceco: ceco_codigo,

        plan_id: +plan_proyecto_id,
        sitio_plan_id: +sitio_id,
      },
    };
    console.log('OT MOVIL', request);
    this.otFacade.createOT(request);
  }

  saveFijoForm(): void {
    const {
      general: { nombre, tipo, cubicacion_id },
      sustentoFinanciero: {
        costos,

        pmo_codigo,
        lp_codigo,
        pep2_capex_id,
        pep2_provisorio,

        id_opex_codigo,
        cuenta_sap_codigo,
        ceco_codigo,
        ceco_provisorio,
      },
      extras: {
        fecha_inicio,
        fecha_fin,
        proyecto_id,
        observaciones,
        admin_contrato_id,
      },
      numeroInterno: { tipo_numero_interno_id, numero_interno },
    } = this.form.getRawValue();

    const request: RequestCreateOTFijo = {
      ot_datos: {
        adm_contrato_proxy_id: +admin_contrato_id,
        proyecto_id: proyecto_id === null ? null : +proyecto_id,
        nombre: nombre.trim(),
        cubicacion_id: +cubicacion_id,
        observaciones: observaciones.trim(),
        fecha_inicio,
        fecha_fin,
        tipo_sustento: costos.toUpperCase(),
        es_sustento_provisorio:
          costos.toUpperCase() === 'CAPEX' ? pep2_provisorio : ceco_provisorio,
        pmo_codigo: costos.toUpperCase() === 'CAPEX' ? +pmo_codigo : pmo_codigo,
        id_opex: id_opex_codigo,
        lp: lp_codigo,
        cuenta_sap:
          costos.toUpperCase() === 'CAPEX'
            ? cuenta_sap_codigo
            : +cuenta_sap_codigo,
        pep2: pep2_capex_id,
        ceco: ceco_codigo,
      },

      ot_numero_interno: {
        tipo_numero_interno_id: +tipo_numero_interno_id,
        numero_interno,
      },
    };

    // if (costos.toUpperCase() === 'CAPEX') {
    //   if (pep2_capex_id === 'capex_provisorio') {
    //     request.sustento_financiero.capex_provisorio = {
    //       pmo_codigo: +pmo_codigo,
    //       lp_codigo,
    //       pep2_codigo: pep2_provisorio,
    //     };
    //   } else {
    //     request.sustento_financiero.capex_id = +pep2_capex_id;
    //   }
    // } else if (costos.toUpperCase() === 'OPEX') {
    //   if (ceco_codigo === 'ceco_provisorio') {
    //     request.sustento_financiero.opex_provisorio = {
    //       id_opex: id_opex_codigo,
    //       cuenta_sap: cuenta_sap_codigo,
    //       ceco_codigo: ceco_provisorio,
    //     };
    //   } else {
    //     request.sustento_financiero.opex_id = +ceco_codigo;
    //   }
    // }

    console.log('SAVE contrato fijo', request);
    // this.otFacade.postOt(request);
  }

  saveOrdinarioForm(): void {
    // Trimpear los textos
    const {
      general: { nombre, tipo, cubicacion_id },
      sustentoFinanciero: {
        costos,

        pmo_codigo,
        lp_codigo,
        pep2_capex_id,
        pep2_provisorio,

        id_opex_codigo,
        cuenta_sap_codigo,
        ceco_codigo,
        ceco_provisorio,
      },
      extras: {
        fecha_inicio,
        fecha_fin,
        proyecto_id,
        observaciones,
        admin_contrato_id,
      },
      detalleAdjudicacion: {
        carta_adjudicacion,
        fecha_adjudicacion,
        numero_pedido,
        materia,
      },
    } = this.form.getRawValue();

    const request: RequestCreateOTOrdinario = {
      ot_datos: {
        adm_contrato_proxy_id: +admin_contrato_id,
        proyecto_id: proyecto_id === null ? null : +proyecto_id,
        nombre: nombre.trim(),
        cubicacion_id: +cubicacion_id,
        observaciones: observaciones.trim(),
        fecha_inicio,
        fecha_fin,
        tipo_sustento: costos.toUpperCase(),
        es_sustento_provisorio:
          costos.toUpperCase() === 'CAPEX' ? pep2_provisorio : ceco_provisorio,
        pmo_codigo: costos.toUpperCase() === 'CAPEX' ? +pmo_codigo : pmo_codigo,
        id_opex: id_opex_codigo,
        lp: lp_codigo,
        cuenta_sap:
          costos.toUpperCase() === 'CAPEX'
            ? cuenta_sap_codigo
            : +cuenta_sap_codigo,
        pep2: pep2_capex_id,
        ceco: ceco_codigo,

        carta_adjudicacion: carta_adjudicacion.trim(),
        fecha_adjudicacion,
        numero_pedido: numero_pedido.trim(),
        materia: materia.trim(),
      },
    };
    console.log('SAVE contrato fijo', request);
    this.otFacade.createOT(request);
  }

  saveBucleForm(): void {}

  get values(): any {
    return this.form ? this.form.getRawValue() : null;
  }
}
