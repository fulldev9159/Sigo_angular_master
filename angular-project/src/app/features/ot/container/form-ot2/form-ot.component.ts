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
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SnackBarService } from '@utilsSIGO/snack-bar';

import { OtFacade } from '@storeOT/features/ot/ot.facade';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';

import { Cubicacion } from '@storeOT/features/cubicacion/cubicacion.model';
import { Plan, Site, PMO, IDOpex } from '@storeOT/features/ot/ot.model';
import { Login } from '@data';

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
  ids_opex$: Observable<IDOpex[]> = of([]);

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
    id_opex_codigo: new FormControl(null, []),
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

    this.ids_opex$ = this.otFacade.getIDsOpexSelector$().pipe(
      map(opexs => opexs || []),
      tap(opexs => this.checkOPEXsAndEnable(opexs))
    );
  }

  initFormControlsEvents(): void {
    this.initCubicacionFormControlEvent();
    this.initProyectoPlanFormControlEvent();
    this.initSitioFormControlEvent();
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
            this.otFacade.getIDsOpex();
          }
        })
    );
  }

  resetPlanProyectoFormControl(): void {
    this.formOT.get('plan_proyecto_id').reset();
    this.otFacade.resetSitio();
  }

  resetSitioFormControl(): void {
    this.formOT.get('sitio_id').reset();
    this.otFacade.resetPMO();
    this.sitioSeleccionado = null;
  }

  resetPMOCodigoFormControl(): void {
    this.formOT.get('pmo_codigo').reset();
  }

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

  checkOPEXsAndEnable(opexs: IDOpex[]): void {
    if (opexs.length > 0) {
      this.formOT.get('id_opex_codigo').enable();
    } else {
      this.formOT.get('id_opex_codigo').disable();
    }
  }

  initData(): void {
    this.subscription.add(
      this.authFacade.getLogin$().subscribe(profile => {
        if (profile) {
          this.cubageFacade.getCubicacionAction();
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
}
