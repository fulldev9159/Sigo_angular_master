import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, BehaviorSubject } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { Cubicacion } from '@storeOT/features/cubicacion/cubicacion.model';
import { Site, PMO, RequestCreateOT } from '@storeOT/features/ot/ot.model';
import { Login } from '@data';
import { GeneralFormComponent } from '../../forms/general-form/general-form.component';
import { PlanProyectoFormComponent } from '../../forms/plan-proyecto-form/plan-proyecto-form.component';
import { SustentoFinancieroFormComponent } from '../../forms/sustento-financiero-form/sustento-financiero-form.component';
import { ExtrasFormComponent } from '../../forms/extras-form/extras-form.component';
import { NumeroInternoFormComponent } from '../../forms/numero-interno-form/numero-interno-form.component';

@Component({
  selector: 'app-form-ot',
  templateUrl: './form-ot.component.html',
  styleUrls: ['./form-ot.component.scss'],
})
export class FormOtComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  contractType$ = new BehaviorSubject<string>('MOVIL');
  authLogin: Login = null;

  cubicacionSeleccionada: Cubicacion = null;
  sitioSeleccionado: Site = null;
  nombre_plan_proyecto: string;

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

  form: FormGroup = new FormGroup({
    general: new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        this.noWhitespace,
        Validators.maxLength(100),
      ]),
      tipo: new FormControl(null, [Validators.required]),
      cubicacion_id: new FormControl(null, [Validators.required]),
    }),
    planProyecto: new FormGroup({
      plan_proyecto_id: new FormControl(null, [Validators.required]),
      sitio_id: new FormControl(null, [Validators.required]),
    }),
    sustentoFinanciero: new FormGroup({
      costos: new FormControl('capex', []),

      pmo_codigo: new FormControl(null, [Validators.required]),
      lp_codigo: new FormControl(null, [Validators.required]),
      pep2_capex_id: new FormControl(null, [Validators.required]),
      pep2_provisorio: new FormControl(null, []),

      id_opex_codigo: new FormControl(null, []),
      cuenta_sap_codigo: new FormControl(null, []),
      ceco_codigo: new FormControl(null, []),
      ceco_provisorio: new FormControl(null, []),
    }),
    extras: new FormGroup({
      fecha_inicio: new FormControl(null, [Validators.required]),
      fecha_fin: new FormControl(null, [Validators.required]),
      proyecto_id: new FormControl(null, [Validators.required]),
      observaciones: new FormControl(null, []),
    }),
    numeroInterno: new FormGroup({
      tipo_numero_interno_id: new FormControl(null, [Validators.required]),
      numero_interno: new FormControl(null, [
        Validators.required,
        this.noWhitespace,
        Validators.maxLength(100),
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
    private authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
    this.otFacade.resetData();

    this.subscription.add(
      this.form
        .get('general')
        .get('cubicacion_id')
        .valueChanges.pipe(
          withLatestFrom(
            this.cubageFacade
              .getCubicacionSelector$()
              .pipe(map(cubicaciones => cubicaciones || []))
          )
        )
        .subscribe(([cubicacion_id, cubicaciones]) => {
          this.resetPlanProyectoFormControl();

          this.cubicacionSeleccionada = null;
          if (cubicacion_id !== null && cubicacion_id !== undefined) {
            this.cubicacionSeleccionada = cubicaciones.find(
              cubicacion => +cubicacion.id === +cubicacion_id
            );

            if (this.cubicacionSeleccionada) {
              // TODO: checkear el tipo contrato de la cubicacion
              const contractType = 'MOVIL';

              // TODO descomentar ésto cuando la obtención del tipo de contrato sea dinámica
              //// if (contractType === 'FIJO') {
              ////   // TODO: se necesita obtener el listado de PMOs sin especificar un sitio
              ////   this.otFacade.getPmosAction({
              ////     sitio_codigo: 'NEW4PHW0003F10',
              ////   });
              //// }

              this.contractType$.next(contractType);
            }
          } else {
            this.disablePlanProyectoFormControl();
          }
        })
    );

    this.subscription.add(
      this.form
        .get('planProyecto')
        .get('plan_proyecto_id')
        .valueChanges.pipe(
          withLatestFrom(
            this.otFacade.getPlansSelector$().pipe(map(planes => planes || []))
          )
        )
        .subscribe(([plan_proyecto_id, planes]) => {
          this.nombre_plan_proyecto = null;
          if (plan_proyecto_id !== null && plan_proyecto_id !== undefined) {
            const plan = planes.find(p => +p.id === +plan_proyecto_id);
            if (plan) {
              this.nombre_plan_proyecto = plan.nombre;
            }
          }
        })
    );

    this.subscription.add(
      this.form
        .get('planProyecto')
        .get('sitio_id')
        .valueChanges.pipe(
          withLatestFrom(
            this.otFacade.getSitesSelector$().pipe(map(sitios => sitios || []))
          )
        )
        .subscribe(([sitio_id, sitios]) => {
          this.resetPMOCodigoFormControl();
          if (sitio_id !== null && sitio_id !== undefined) {
            this.sitioSeleccionado = sitios.find(s => +s.id === +sitio_id);

            if (this.sitioSeleccionado) {
              this.otFacade.getPmosAction({
                sitio_codigo: this.sitioSeleccionado.codigo,
              });
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

    if (contractType === 'MOVIL') {
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
    } else if (contractType === 'FIJO') {
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
    }
  }

  get valid(): boolean {
    const contractType = this.contractType$.value;

    if (contractType === 'MOVIL') {
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
    } else if (contractType === 'FIJO') {
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
    }

    return false;
  }

  save(): void {
    this.touch();
    if (this.valid) {
      const contractType = this.contractType$.value;

      if (contractType === 'MOVIL') {
        this.saveMovilForm();
      } else if (contractType === 'FIJO') {
        this.saveFijoForm();
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
      extras: { fecha_inicio, fecha_fin, proyecto_id, observaciones },
    } = this.form.getRawValue();

    const request: RequestCreateOT = {
      nombre,
      tipo,
      proyecto_id: +proyecto_id,
      cubicacion_id: +cubicacion_id,
      sitio_id: +sitio_id,
      propietario_id: +this.authLogin.usuario_id,
      fecha_inicio,
      fecha_fin,
      observaciones,
      sustento_financiero: {
        tipo_sustento: costos.toUpperCase(),
        capex_id: null,
        opex_id: null,
        capex_provisorio: null,
        opex_provisorio: null,
      },
    };

    if (costos.toUpperCase() === 'CAPEX') {
      if (pep2_capex_id === 'capex_provisorio') {
        request.sustento_financiero.capex_provisorio = {
          pmo_codigo: +pmo_codigo,
          lp_codigo,
          pep2_codigo: pep2_provisorio,
        };
      } else {
        request.sustento_financiero.capex_id = +pep2_capex_id;
      }
    } else if (costos.toUpperCase() === 'OPEX') {
      if (ceco_codigo === 'ceco_provisorio') {
        request.sustento_financiero.opex_provisorio = {
          id_opex: id_opex_codigo,
          cuenta_sap: cuenta_sap_codigo,
          ceco_codigo: ceco_provisorio,
        };
      } else {
        request.sustento_financiero.opex_id = +ceco_codigo;
      }
    }

    this.otFacade.postOt(request);
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
      extras: { fecha_inicio, fecha_fin, proyecto_id, observaciones },
      numeroInterno: { tipo_numero_interno_id, numero_interno },
    } = this.form.getRawValue();

    const request = {
      nombre,
      tipo,
      cubicacion_id: +cubicacion_id,
      propietario_id: +this.authLogin.usuario_id,
      fecha_inicio,
      fecha_fin,
      observaciones,
      sustento_financiero: {
        tipo_sustento: costos.toUpperCase(),
        capex_id: null,
        opex_id: null,
        capex_provisorio: null,
        opex_provisorio: null,
      },

      tipo_numero_interno_id,
      numero_interno,
    };

    if (costos.toUpperCase() === 'CAPEX') {
      if (pep2_capex_id === 'capex_provisorio') {
        request.sustento_financiero.capex_provisorio = {
          pmo_codigo: +pmo_codigo,
          lp_codigo,
          pep2_codigo: pep2_provisorio,
        };
      } else {
        request.sustento_financiero.capex_id = +pep2_capex_id;
      }
    } else if (costos.toUpperCase() === 'OPEX') {
      if (ceco_codigo === 'ceco_provisorio') {
        request.sustento_financiero.opex_provisorio = {
          id_opex: id_opex_codigo,
          cuenta_sap: cuenta_sap_codigo,
          ceco_codigo: ceco_provisorio,
        };
      } else {
        request.sustento_financiero.opex_id = +ceco_codigo;
      }
    }

    console.log('SAVE contrato fijo', request);
  }
}
