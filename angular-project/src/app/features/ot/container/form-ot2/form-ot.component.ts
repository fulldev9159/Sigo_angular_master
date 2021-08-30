import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  Observable,
  Subscription,
  of,
  combineLatest,
} from 'rxjs';
import {
  ignoreElements,
  map,
  takeUntil,
  withLatestFrom,
  tap,
} from 'rxjs/operators';

import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { SnackBarService } from '@utilsSIGO/snack-bar';

import { OtFacade } from '@storeOT/features/ot/ot.facade';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';

import { Cubicacion } from '@storeOT/features/cubicacion/cubicacion.model';
import {
  Plan,
  Site,
  PMO,
  IDOpex,
  CuentaSap,
  Lp,
  Pep2,
  CECO,
  Proyecto,
  RequestCreateOT,
} from '@storeOT/features/ot/ot.model';
import { Login } from '@data';
import { resetData } from '@storeOT/features/cubicacion/cubicacion.actions';

@Component({
  selector: 'app-form-ot2',
  templateUrl: './form-ot.component.html',
  styleUrls: ['./form-ot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormOt2Component implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  authLogin: Login = null;

  cubicaciones$: Observable<Cubicacion[]>;
  planes$: Observable<Plan[]> = of([]);
  cubicacionSeleccionada: Cubicacion = null;
  nombre_plan_proyecto = '';
  sitios$: Observable<Site[]> = of([]);
  sitioSeleccionado: Site = null;
  pmos$: Observable<PMO[]> = of([]);
  lps$: Observable<Lp[]> = of([]);
  pep2s$: Observable<Pep2[]> = of([]);
  proyectos$: Observable<Proyecto[]> = of([]);

  ids_opex$: Observable<IDOpex[]> = of([]);
  cuentas_sap$: Observable<CuentaSap[]> = of([]);
  cecos$: Observable<CECO[]> = of([]);

  msgsWrongDates = [
    {
      severity: 'error',
      summary: 'ERROR',
      detail: 'La fecha de fin no puede ser inferior a la fecha de inicio',
    },
  ];

  formControls = {
    nombre: new FormControl('', [
      Validators.required,
      this.noWhitespace,
      Validators.maxLength(100),
    ]),
    tipo: new FormControl(null, [Validators.required]),
    cubicacion_id: new FormControl(null, [Validators.required]),
    plan_proyecto_id: new FormControl(null, [Validators.required]),
    sitio_id: new FormControl(null, [Validators.required]),
    costos: new FormControl('capex', []),

    pmo_codigo: new FormControl(null, [Validators.required]),
    lp_codigo: new FormControl(null, [Validators.required]),
    pep2_capex_id: new FormControl(null, [Validators.required]),
    pep2_provisorio: new FormControl(null, []),

    id_opex_codigo: new FormControl(null, []),
    cuenta_sap_codigo: new FormControl(null, []),
    ceco_codigo: new FormControl(null, []),
    ceco_provisorio: new FormControl(null, []),

    fecha_inicio: new FormControl(null, [Validators.required]),
    fecha_fin: new FormControl(null, [Validators.required]),
    proyecto_id: new FormControl(null, [Validators.required]),
    observaciones: new FormControl(null, []),
  };

  formOT: FormGroup = new FormGroup(this.formControls);

  constructor(
    private router: Router,
    private otFacade: OtFacade,
    private cubageFacade: CubicacionFacade,
    private authFacade: AuthFacade,
    private snackService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.otFacade.resetData();
    this.initObservables();
    this.initFormControlsEvents();
    this.initData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initObservables(): void {
    this.cubicaciones$ = this.cubageFacade
      .getCubicacionSelector$()
      .pipe(
        map(cubicaciones =>
          cubicaciones.filter(
            cubicacion =>
              !cubicacion.asignado &&
              this.authLogin.usuario_id === cubicacion.creador_usuario_id
          )
        )
      );
    // this.cubicaciones$.subscribe(misCubs => {
    //   console.log(misCubs);
    //   if (misCubs.length === 0) {
    //     this.snackService.showMessage(
    //       'No hay cubicaciones que se puedan escoger',
    //       'warning'
    //     );
    //   }
    // });

    this.planes$ = this.otFacade.getPlansSelector$().pipe(
      map(proveedores => proveedores || []),
      tap(proveedores => this.checkPlanProyectoAndEnable(proveedores))
    );

    this.sitios$ = this.otFacade.getSitesSelector$().pipe(
      map(sitios => sitios || []),
      tap(sitios => this.checkSitiosAndEnable(sitios))
    );

    this.pmos$ = this.otFacade.getPmosSelector$().pipe(
      map(pmos => pmos || []),
      tap(pmos => this.checkPMOsAndEnable(pmos))
    );

    this.lps$ = this.otFacade.getLpsSelector$().pipe(
      map(lps => lps || []),
      tap(lps => this.checkLPsAndEnable(lps))
    );

    this.pep2s$ = this.otFacade.getPep2sSelector$().pipe(
      map(pep2s => pep2s || []),
      tap(pep2s => this.checkPep2sAndEnable(pep2s))
    );

    this.ids_opex$ = this.otFacade.getIDsOpexSelector$().pipe(
      map(opexs => opexs || []),
      tap(opexs => this.checkOPEXsAndEnable(opexs))
    );

    this.cuentas_sap$ = this.otFacade.getCuentaSAPSelector$().pipe(
      map(saps => saps || []),
      tap(saps => this.checkSAPsAndEnable(saps))
    );

    this.cecos$ = this.otFacade.getCECOSelector$().pipe(
      map(cecos => cecos || []),
      tap(cecos => this.checkCECOsAndEnable(cecos))
    );

    this.proyectos$ = this.otFacade.getProyectoSelector$();
  }

  initFormControlsEvents(): void {
    this.initCubicacionFormControlEvent();
    this.initProyectoPlanFormControlEvent();
    this.initSitioFormControlEvent();
    this.initCostosFormControlEvent();
    this.initPMOFormControlEvent();
    this.initLPsFormControlEvent();
    this.initPEP2FormControlEvent();
    this.initOPEXFormControlEvent();
    this.initCuentaSAPFormControlEvent();
    this.initCECOFormControlEvent();
  }

  initCubicacionFormControlEvent(): void {
    this.subscription.add(
      this.formOT
        .get('cubicacion_id')
        .valueChanges.pipe(withLatestFrom(this.cubicaciones$))
        .subscribe(([cubicacion_id, cubicaciones]) => {
          this.resetPlanProyectoFormControl();
          if (cubicacion_id !== null && cubicacion_id !== undefined) {
            this.cubicacionSeleccionada = cubicaciones.find(
              cubicacion => +cubicacion.id === +cubicacion_id
            );
            if (this.cubicacionSeleccionada) {
              this.otFacade.getPlansAction({
                region_id: this.cubicacionSeleccionada.region_id,
              });
            }
          } else {
            this.checkPlanProyectoAndEnable([]);
          }
        })
    );
  }

  initProyectoPlanFormControlEvent(): void {
    this.subscription.add(
      this.formOT
        .get('plan_proyecto_id')
        .valueChanges.pipe(withLatestFrom(this.planes$))
        .subscribe(([plan_proyecto_id, planes]) => {
          this.resetSitioFormControl();
          if (plan_proyecto_id !== null && plan_proyecto_id !== undefined) {
            const plan = planes.find(p => +p.id === +plan_proyecto_id);
            if (plan) {
              this.nombre_plan_proyecto = plan.nombre;
            }
            if (this.cubicacionSeleccionada) {
              this.otFacade.getSitesAction({
                plan_proyecto_id,
                region_id: this.cubicacionSeleccionada.region_id,
              });
            }
          } else {
            this.checkSitiosAndEnable([]);
          }
        })
    );
  }

  initSitioFormControlEvent(): void {
    this.subscription.add(
      this.formOT
        .get('sitio_id')
        .valueChanges.pipe(withLatestFrom(this.sitios$))
        .subscribe(([sitio_id, sitios]) => {
          this.resetPMOCodigoFormControl();
          if (sitio_id !== null && sitio_id !== undefined) {
            this.sitioSeleccionado = sitios.find(s => +s.id === +sitio_id);
            this.otFacade.getPmosAction({
              sitio_codigo: this.sitioSeleccionado.codigo,
            });
          } else {
            this.checkPMOsAndEnable([]);
          }
        })
    );
  }

  initCostosFormControlEvent(): void {
    this.subscription.add(
      this.formOT.get('costos').valueChanges.subscribe(costos => {
        if (costos === 'capex') {
          this.resetControl(this.formOT.get('pep2_provisorio'));
          this.formOT.get('pmo_codigo').setValidators([Validators.required]);
          this.formOT.get('lp_codigo').setValidators([Validators.required]);
          this.formOT.get('pep2_capex_id').setValidators([Validators.required]);
          this.formOT.get('id_opex_codigo').setValidators(null);
          this.formOT.get('cuenta_sap_codigo').setValidators(null);
          this.formOT.get('ceco_codigo').setValidators(null);
          this.formOT.get('ceco_provisorio').setValidators(null);
          this.resetControl(this.formOT.get('id_opex_codigo'));
          this.resetControl(this.formOT.get('cuenta_sap_codigo'));
          this.resetControl(this.formOT.get('ceco_codigo'));
          this.resetControl(this.formOT.get('ceco_provisorio'));
        } else if (costos === 'opex') {
          this.resetControl(this.formOT.get('pmo_codigo'));
          this.resetControl(this.formOT.get('lp_codigo'));
          this.resetControl(this.formOT.get('pep2_capex_id'));
          this.resetControl(this.formOT.get('pep2_provisorio'));
          this.formOT
            .get('id_opex_codigo')
            .setValidators([Validators.required]);
          this.formOT
            .get('cuenta_sap_codigo')
            .setValidators([Validators.required]);
          this.formOT.get('ceco_codigo').setValidators([Validators.required]);
          this.formOT.get('pmo_codigo').setValidators(null);
          this.formOT.get('lp_codigo').setValidators(null);
          this.formOT.get('pep2_capex_id').setValidators(null);
          this.formOT.get('pep2_provisorio').setValidators(null);
        }
      })
    );
  }

  initPMOFormControlEvent(): void {
    this.subscription.add(
      this.formOT.get('pmo_codigo').valueChanges.subscribe(pmo_codigo => {
        this.resetLPFormControl();
        if (pmo_codigo !== null && pmo_codigo !== undefined) {
          this.otFacade.getLpsAction({ pmo_codigo });
        } else {
          this.checkLPsAndEnable([]);
        }
      })
    );
  }

  initLPsFormControlEvent(): void {
    this.subscription.add(
      this.formOT.get('lp_codigo').valueChanges.subscribe(lp_codigo => {
        this.resetPep2FormControl();
        if (lp_codigo !== null && lp_codigo !== undefined) {
          this.otFacade.getPep2sAction({
            pmo_codigo: this.formOT.value.pmo_codigo,
            lp_codigo,
          });
        } else {
          this.checkPep2sAndEnable([]);
        }
      })
    );
  }

  initPEP2FormControlEvent(): void {
    this.subscription.add(
      this.formOT.get('pep2_capex_id').valueChanges.subscribe(pep2_capex_id => {
        this.resetPep2ProvisorioFormControl();
        if (
          pep2_capex_id !== null &&
          pep2_capex_id !== undefined &&
          pep2_capex_id === 'capex_provisorio'
        ) {
          this.formOT
            .get('pep2_provisorio')
            .setValidators([Validators.required, this.noWhitespace]);
        } else if (
          pep2_capex_id !== null &&
          pep2_capex_id !== undefined &&
          pep2_capex_id !== 'capex_provisorio'
        ) {
          this.formOT.get('pep2_provisorio').setValidators(null);
        }
      })
    );
  }

  initOPEXFormControlEvent(): void {
    this.subscription.add(
      this.formOT
        .get('id_opex_codigo')
        .valueChanges.subscribe(id_opex_codigo => {
          this.resetSAPsFormControl();
          if (id_opex_codigo !== null && id_opex_codigo !== undefined) {
            this.otFacade.getCuentaSAPAction({ id_opex_codigo });
          } else {
            this.checkSAPsAndEnable([]);
          }
        })
    );
  }

  initCuentaSAPFormControlEvent(): void {
    this.subscription.add(
      this.formOT
        .get('cuenta_sap_codigo')
        .valueChanges.subscribe(cuenta_sap_codigo => {
          this.resetCECOFormControl();
          if (cuenta_sap_codigo !== null && cuenta_sap_codigo !== undefined) {
            this.otFacade.getCECOAction({
              id_opex_codigo: this.formOT.value.id_opex_codigo,
              cuenta_sap_codigo,
            });
          }
        })
    );
  }

  initCECOFormControlEvent(): void {
    this.subscription.add(
      this.formOT.get('ceco_codigo').valueChanges.subscribe(ceco_codigo => {
        this.resetCECOProvisorioFormControl();
        if (
          ceco_codigo !== null &&
          ceco_codigo !== undefined &&
          ceco_codigo === 'ceco_provisorio'
        ) {
          this.formOT
            .get('ceco_provisorio')
            .setValidators([Validators.required, this.noWhitespace]);
        } else if (
          ceco_codigo !== null &&
          ceco_codigo !== undefined &&
          ceco_codigo !== 'ceco_provisorio'
        ) {
          this.formOT.get('ceco_provisorio').setValidators(null);
        }
      })
    );
  }

  //// ------ CHECKS ENABLED -------
  checkPlanProyectoAndEnable(planes: Plan[]): void {
    if (planes.length > 0) {
      this.formOT.get('plan_proyecto_id').enable();
    } else {
      this.formOT.get('plan_proyecto_id').disable();
    }
  }

  checkSitiosAndEnable(sitios: Site[]): void {
    if (sitios.length > 0) {
      this.formOT.get('sitio_id').enable();
    } else {
      this.formOT.get('sitio_id').disable();
    }
  }

  checkPMOsAndEnable(pmos: PMO[]): void {
    if (pmos.length > 0) {
      this.formOT.get('pmo_codigo').enable();
    } else {
      this.formOT.get('pmo_codigo').disable();
    }
  }

  checkLPsAndEnable(lps: Lp[]): void {
    if (lps.length > 0) {
      this.formOT.get('lp_codigo').enable();
    } else {
      this.formOT.get('lp_codigo').disable();
    }
  }

  checkPep2sAndEnable(pep2s: Pep2[]): void {
    if (pep2s.length > 0) {
      this.formOT.get('pep2_capex_id').enable();
    } else {
      this.formOT.get('pep2_capex_id').disable();
    }
  }

  checkOPEXsAndEnable(opexs: IDOpex[]): void {
    if (opexs.length > 0) {
      this.formOT.get('id_opex_codigo').enable();
    } else {
      this.formOT.get('id_opex_codigo').disable();
    }
  }

  checkSAPsAndEnable(saps: CuentaSap[]): void {
    if (saps.length > 0) {
      this.formOT.get('cuenta_sap_codigo').enable();
    } else {
      this.formOT.get('cuenta_sap_codigo').disable();
    }
  }

  checkCECOsAndEnable(cecos: CECO[]): void {
    if (cecos.length > 0) {
      this.formOT.get('ceco_codigo').enable();
    } else {
      this.formOT.get('ceco_codigo').disable();
    }
  }
  /// ----------- RESETS -----------------
  resetPlanProyectoFormControl(): void {
    this.formOT.get('plan_proyecto_id').reset();
    this.otFacade.resetPlanProyecto();
  }

  resetSitioFormControl(): void {
    this.formOT.get('sitio_id').reset();
    this.otFacade.resetSitio();
    this.sitioSeleccionado = null;
  }

  resetPMOCodigoFormControl(): void {
    this.formOT.get('pmo_codigo').reset();
    this.otFacade.resetPMO();
  }

  resetLPFormControl(): void {
    this.formOT.get('lp_codigo').reset();
    this.otFacade.resetLPs();
  }

  resetPep2FormControl(): void {
    this.formOT.get('pep2_capex_id').reset();
    this.otFacade.resetPEP2();
  }

  resetPep2ProvisorioFormControl(): void {
    this.formOT.get('pep2_provisorio').reset();
  }

  resetOPEXFormControl(): void {
    this.formOT.get('ids_opex').reset();
  }

  resetSAPsFormControl(): void {
    this.formOT.get('cuenta_sap_codigo').reset();
    this.otFacade.resetSAP();
  }

  resetCECOFormControl(): void {
    this.formOT.get('ceco_codigo').reset();
    this.otFacade.resetCECO();
  }

  resetCECOProvisorioFormControl(): void {
    this.formOT.get('ceco_provisorio').reset();
  }

  resetControl(control: AbstractControl): void {
    control.reset();
    control.clearValidators();
    control.markAsUntouched();
    control.markAsPristine();
    control.updateValueAndValidity();
  }

  initData(): void {
    this.cubageFacade.getCubicacionAction();
    this.otFacade.getIDsOpex();
    this.otFacade.getProyectoAction();
    this.subscription.add(
      this.authFacade.getLogin$().subscribe(profile => {
        if (profile) {
          this.authLogin = profile;
        }
      })
    );
  }

  goBack(): void {
    this.otFacade.resetData();
    this.cubicacionSeleccionada = null;
    this.nombre_plan_proyecto = '';
    this.sitioSeleccionado = null;
    this.router.navigate(['/app/ot/list-ot']);
  }

  noWhitespace(control: FormControl): any {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  get invalidDates(): boolean {
    if (
      this.formOT.get('fecha_inicio').valid &&
      this.formOT.get('fecha_fin').valid
    ) {
      const { fecha_inicio, fecha_fin } = this.formOT.getRawValue();
      const sdDay = fecha_inicio.getDate();
      const sdMonth = fecha_inicio.getMonth() + 1;
      const sdYear = fecha_inicio.getFullYear();

      const edDay = fecha_fin.getDate();
      const edMonth = fecha_fin.getMonth() + 1;
      const edYear = fecha_fin.getFullYear();

      if (sdYear > edYear) {
        return true;
      }
      if (sdMonth > edMonth) {
        return true;
      }
      if (sdDay > edDay) {
        return true;
      }
    }

    return false;
  }

  cancel(): void {
    // this.initForm(});
    this.otFacade.resetData();
    this.router.navigate(['app/ot/list-ot']);
  }

  touch(): void {
    Object.keys(this.formOT.controls).forEach(field => {
      const control = this.formOT.get(field);
      control.markAsTouched({
        onlySelf: true,
      });
    });

    this.formOT.markAsTouched({
      onlySelf: true,
    });
  }

  save(): void {
    this.touch();
    if (this.formOT.valid) {
      const form = this.formOT.value;

      const request: RequestCreateOT = {
        nombre: form.nombre,
        tipo: form.tipo,
        proyecto_id: +form.proyecto_id,
        cubicacion_id: +form.cubicacion_id,
        sitio_id: +form.sitio_id,
        propietario_id: +this.authLogin.usuario_id,
        fecha_inicio: form.fecha_inicio,
        fecha_fin: form.fecha_fin,
        observaciones: form.observaciones,
        sustento_financiero: {
          tipo_sustento: form.costos.toUpperCase(),
          capex_id: null,
          opex_id: null,
          capex_provisorio: null,
          opex_provisorio: null,
        },
      };

      if (form.costos.toUpperCase() === 'CAPEX') {
        if (form.pep2_capex_id === 'capex_provisorio') {
          request.sustento_financiero.capex_provisorio = {
            pmo_codigo: +form.pmo_codigo,
            lp_codigo: form.lp_codigo,
            pep2_codigo: form.pep2_provisorio,
          };
        } else {
          request.sustento_financiero.capex_id = +form.pep2_capex_id;
        }
      } else if (form.costos.toUpperCase() === 'OPEX') {
        if (form.ceco_codigo === 'ceco_provisorio') {
          request.sustento_financiero.opex_provisorio = {
            id_opex: form.id_opex_codigo,
            cuenta_sap: form.cuenta_sap_codigo,
            ceco_codigo: form.ceco_provisorio,
          };
        } else {
          request.sustento_financiero.opex_id = +form.ceco_codigo;
        }
      }

      console.log(request);
      // // this.otFacade.replyOt(form);
      // this.otFacade.postOtSCE(request);
      this.otFacade.postOt(request);
      // this.formOt.reset();
    }
  }
}
