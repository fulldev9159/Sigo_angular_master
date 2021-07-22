import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { Cubicacion } from '@storeOT/features/cubicacion/cubicacion.model';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import * as OTmodel from '@storeOT/features/ot/ot.model';
import { MessageService } from 'primeng/api';
import { Observable, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Login } from '@data';

@Component({
  selector: 'app-form-ot',
  templateUrl: './form-ot.component.html',
  styleUrls: ['./form-ot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormOtComponent implements OnInit, OnDestroy {
  // declarations
  public capexID = '';
  public cecoCodigo = '';
  public formOt: FormGroup;
  public cubicacionSeleccionada: Cubicacion = null;
  public authLogin: Login = null;
  public cubicaciones: Cubicacion[] = [];
  public cubicaciones$: Observable<Cubicacion[]>;
  public plans: OTmodel.Plan[];
  public planes$: Observable<OTmodel.Plan[]> = of([]);
  public sitios: OTmodel.Site[] = [];
  public sitios$: Observable<OTmodel.Site[]> = of([]);
  public pmos: OTmodel.PMO[] = [];
  public pmos$: Observable<OTmodel.PMO[]> = of([]);
  public lps: OTmodel.Lp[];
  public lps$: Observable<OTmodel.Lp[]> = of([]);
  public pep2s: OTmodel.Pep2[];
  public pep2s$: Observable<OTmodel.Pep2[]> = of([]);
  public ids_opex: OTmodel.IDOpex[] = [];
  public ids_opex$: Observable<OTmodel.IDOpex[]> = of([]);
  public cuentas_sap: OTmodel.CuentaSap[];
  public cuentas_sap$: Observable<OTmodel.CuentaSap[]> = of([]);
  public cecos: OTmodel.CECO[];
  public cecos$: Observable<OTmodel.CECO[]> = of([]);
  public proyectos: OTmodel.Proyecto[];
  public proyectos$: Observable<OTmodel.Proyecto[]> = of([]);
  private destroyInstance$: Subject<boolean> = new Subject();

  constructor(
    private fb: FormBuilder,
    private otFacade: OtFacade,
    private authFacade: AuthFacade,
    private cubageFacade: CubicacionFacade,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.authFacade
      .getLogin$()
      .pipe(takeUntil(this.destroyInstance$))
      .subscribe(authLogin => {
        if (authLogin) {
          this.authLogin = authLogin;
          this.formOt.get('gestor_id').setValue(this.authLogin.usuario_id);
        }
      });

    this.authFacade
      .getCurrentProfile$()
      .pipe(takeUntil(this.destroyInstance$))
      .subscribe(profile => {
        if (profile) {
          this.cubageFacade.getCubicacionAction(+profile.id);
        }
      });

    this.cubicaciones$ = this.cubageFacade
      .getCubicacionSelector$()
      .pipe(
        map(
          cubicaciones =>
            (this.cubicaciones = cubicaciones.filter(x => !x.asignado))
        )
      );
    this.planes$ = this.otFacade
      .getPlansSelector$()
      .pipe(map(plans => (this.plans = plans)));
    this.sitios$ = this.otFacade.getSitesSelector$().pipe(
      map(
        sitios =>
          (this.sitios = sitios.map(x => ({
            ...x,
            nombre: `${x.codigo} - ${x.nombre}`,
          })))
      )
    );
    this.pmos$ = this.otFacade
      .getPmosSelector$()
      .pipe(map(pmos => (this.pmos = pmos)));
    this.lps$ = this.otFacade
      .getLpsSelector$()
      .pipe(map(lps => (this.lps = lps)));
    this.pep2s$ = this.otFacade
      .getPep2sSelector$()
      .pipe(map(pep2s => (this.pep2s = pep2s)));
    this.ids_opex$ = this.otFacade
      .getIDsOpexSelector$()
      .pipe(map(ids_opex => (this.ids_opex = ids_opex)));
    this.cuentas_sap$ = this.otFacade
      .getCuentaSAPSelector$()
      .pipe(map(cuentas_sap => (this.cuentas_sap = cuentas_sap)));
    this.cecos$ = this.otFacade
      .getCECOSelector$()
      .pipe(map(cecos => (this.cecos = cecos)));
    this.otFacade.getProyectoAction();
    this.proyectos$ = this.otFacade
      .getProyectoSelector$()
      .pipe(map(proyectos => (this.proyectos = proyectos)));
  }

  ngOnDestroy(): void {
    this.destroyInstance$.next(true);
    this.destroyInstance$.complete();
  }

  initForm(): void {
    this.formOt = this.fb.group({
      id: null,
      token: null,
      gestor_id: null,

      nombre: [null, [Validators.required, Validators.maxLength(100)]],
      tipo: [null, Validators.required],
      cubicacion_id: [null, Validators.required],

      plan_proyecto_id: [null, Validators.required],
      plan_nombre: [null, Validators.required], // depende de plan_proyecto_id
      sitio_id: [null, Validators.required],
      costos: 'capex',

      // dependen de sitio_id
      sitio_nombre: [null, Validators.required],
      codigo: [null, Validators.required],
      direccion: [null, Validators.required],
      latitud: [null, Validators.required],
      longitud: [null, Validators.required],

      // costos = 'capex'
      pmo_codigo: [null, Validators.required],
      lp_codigo: [null, Validators.required],
      capex_id: [null, Validators.required],
      pep2_provisorio: null,

      // costos = 'opex'
      id_opex_codigo: null,
      cuenta_sap_codigo: null,
      ceco_codigo: null,
      ceco_provisorio: null,

      fecha_inicio: [null, Validators.required],
      fecha_fin: [null, Validators.required],
      proyecto_id: null,
      observaciones: null,

      pep2_codigo: null, // ?
    });

    this.detectChangesForm();
  }

  detectChangesForm(): void {
    this.formOt
      .get('cubicacion_id')
      .valueChanges.pipe(takeUntil(this.destroyInstance$))
      .subscribe(cubicacionId => {
        if (cubicacionId) {
          this.cubicacionSeleccionada = this.cubicaciones.find(
            c => +c.id === +cubicacionId
          );
          if (this.cubicacionSeleccionada) {
            this.otFacade.getPlansAction({
              region_id: this.cubicacionSeleccionada.region_id,
            });
          }

          // refrescamos parte de
          //  formulario al cambiar cubicación
          // this.resetForm('CUBICATION');
        }
      });

    this.formOt
      .get('plan_proyecto_id')
      .valueChanges.pipe(takeUntil(this.destroyInstance$))
      .subscribe(plan_proyecto_id => {
        if (plan_proyecto_id) {
          const plan = this.plans.find(p => +p.id === +plan_proyecto_id);
          if (plan) {
            this.formOt.get('plan_nombre').setValue(plan.nombre);
          }
          this.otFacade.getSitesAction({
            plan_proyecto_id,
            region_id: this.cubicacionSeleccionada.region_id,
          });

          // refrescamos parte de
          //  formulario al cambiar plan
          this.resetForm('PLAN');
        }
      });

    this.formOt
      .get('sitio_id')
      .valueChanges.pipe(takeUntil(this.destroyInstance$))
      .subscribe(sitio_id => {
        if (sitio_id) {
          const site = this.sitios.find(s => +s.id === +sitio_id);
          // const id_sustento_controls = 'costos';
          // const rbutton = this.formOt.controls[id_sustento_controls].value;
          if (site) {
            this.otFacade.getPmosAction({
              sitio_codigo: site.codigo,
            });
            this.otFacade.getIDsOpex();
            this.formOt.get('sitio_nombre').setValue(site.nombre);
            this.formOt.get('codigo').setValue(site.codigo);
            this.formOt.get('direccion').setValue(site.direccion);
            this.formOt.get('latitud').setValue(site.geo_lat);
            this.formOt.get('longitud').setValue(site.geo_lon);
          }
          // refrescamos parte de
          //  formulario al cambiar site
          // this.resetForm('SITE');
        }
      });

    this.formOt
      .get('pmo_codigo')
      .valueChanges.pipe(takeUntil(this.destroyInstance$))
      .subscribe(pmo_codigo => {
        if (pmo_codigo) {
          this.otFacade.getLpsAction({ pmo_codigo });

          // refrescamos parte de
          //  formulario al cambiar pmo
          // this.resetForm('PMO');
        }
      });

    this.formOt
      .get('id_opex_codigo')
      .valueChanges.pipe(takeUntil(this.destroyInstance$))
      .subscribe(id_opex_codigo => {
        if (id_opex_codigo) {
          this.otFacade.getCuentaSAPAction({
            id_opex_codigo,
          });
          // refrescamos parte de
          //  formulario al cambiar id_opex
          // this.resetForm('ID_OPEX');
        }
      });

    this.formOt
      .get('cuenta_sap_codigo')
      .valueChanges.pipe(takeUntil(this.destroyInstance$))
      .subscribe(cuenta_sap_codigo => {
        if (cuenta_sap_codigo) {
          this.otFacade.getCECOAction({
            id_opex_codigo: this.formOt.value.id_opex_codigo,
            cuenta_sap_codigo,
          });
          // refrescamos parte de
          //  formulario al cambiar cuenta sap
          // this.resetForm('CUENTA_SAP');
        }
      });

    this.formOt
      .get('lp_codigo')
      .valueChanges.pipe(takeUntil(this.destroyInstance$))
      .subscribe(lp_codigo => {
        if (lp_codigo) {
          this.otFacade.getPep2sAction({
            pmo_codigo: this.formOt.value.pmo_codigo,
            lp_codigo,
          });

          // refrescamos parte de
          //  formulario al cambiar lp
          // this.resetForm('LP');
        }
      });

    this.formOt
      .get('capex_id')
      .valueChanges.pipe(takeUntil(this.destroyInstance$))
      .subscribe(capex_id => {
        this.capexID = capex_id;
        if (capex_id === 'capex_provisorio') {
          this.formOt
            .get('pep2_provisorio')
            .setValidators([Validators.required, Validators.maxLength(100)]);
        } else {
          this.formOt.get('pep2_provisorio').clearValidators();
        }
        this.formOt.get('pep2_provisorio').updateValueAndValidity();
      });

    this.formOt
      .get('ceco_codigo')
      .valueChanges.pipe(takeUntil(this.destroyInstance$))
      .subscribe(ceco_codigo => {
        this.cecoCodigo = ceco_codigo;
        if (ceco_codigo === 'ceco_provisorio') {
          this.formOt
            .get('ceco_provisorio')
            .setValidators([Validators.required, Validators.maxLength(200)]);
        } else {
          this.formOt.get('ceco_provisorio').clearValidators();
        }
        this.formOt.get('ceco_provisorio').updateValueAndValidity();
      });

    this.formOt
      .get('costos')
      .valueChanges.pipe(takeUntil(this.destroyInstance$))
      .subscribe(costos => {
        if (costos) {
          const site = this.sitios.find(
            s => +s.id === +this.formOt.value.sitio_id
          );
          if (costos === 'capex') {
            this.otFacade.getPmosAction({
              sitio_codigo: site.codigo,
            });

            this.formOt.get('pmo_codigo').setValidators([Validators.required]);
            this.formOt.get('lp_codigo').setValidators([Validators.required]);
            this.formOt.get('capex_id').setValidators([Validators.required]);
            this.formOt.get('pep2_provisorio').clearValidators();

            const { capex_id } = this.formOt.getRawValue();
            if (capex_id === 'capex_provisorio') {
              this.formOt
                .get('pep2_provisorio')
                .setValidators([
                  Validators.required,
                  Validators.maxLength(100),
                ]);
            } else {
              this.formOt.get('pep2_provisorio').clearValidators();
            }

            this.formOt.get('id_opex_codigo').clearValidators();
            this.formOt.get('cuenta_sap_codigo').clearValidators();
            this.formOt.get('ceco_codigo').clearValidators();
            this.formOt.get('ceco_provisorio').clearValidators();
          } else if (costos === 'opex') {
            this.otFacade.getIDsOpex();

            this.formOt.get('pmo_codigo').clearValidators();
            this.formOt.get('lp_codigo').clearValidators();
            this.formOt.get('capex_id').clearValidators();
            this.formOt.get('pep2_provisorio').clearValidators();

            this.formOt
              .get('id_opex_codigo')
              .setValidators([Validators.required]);
            this.formOt
              .get('cuenta_sap_codigo')
              .setValidators([Validators.required]);
            this.formOt.get('ceco_codigo').setValidators([Validators.required]);

            const { ceco_codigo } = this.formOt.getRawValue();
            if (ceco_codigo === 'ceco_provisorio') {
              this.formOt
                .get('ceco_provisorio')
                .setValidators([
                  Validators.required,
                  Validators.maxLength(200),
                ]);
            } else {
              this.formOt.get('ceco_provisorio').clearValidators();
            }
          }

          this.formOt.get('pmo_codigo').updateValueAndValidity();
          this.formOt.get('lp_codigo').updateValueAndValidity();
          this.formOt.get('capex_id').updateValueAndValidity();
          this.formOt.get('pep2_provisorio').updateValueAndValidity();

          this.formOt.get('id_opex_codigo').updateValueAndValidity();
          this.formOt.get('cuenta_sap_codigo').updateValueAndValidity();
          this.formOt.get('ceco_codigo').updateValueAndValidity();
          this.formOt.get('ceco_provisorio').updateValueAndValidity();
        }
      });
  }

  resetForm(part: string): void {
    switch (true) {
      case part === 'CUBICATION':
        this.formOt.get('plan_despliegue_id').reset();
        this.formOt.get('sitio_id').reset();
        this.formOt.get('pmo_codigo').reset();
        this.formOt.get('lp_codigo').reset();
        this.formOt.get('pep2_codigo').reset();
        break;
      case part === 'PLAN':
        this.formOt.get('sitio_id').reset();
        this.formOt.get('pmo_codigo').reset();
        this.formOt.get('lp_codigo').reset();
        this.formOt.get('pep2_codigo').reset();
        break;
      case part === 'SITE':
        this.formOt.get('pmo_codigo').reset();
        this.formOt.get('lp_codigo').reset();
        this.formOt.get('pep2_codigo').reset();
        break;
      case part === 'PMO':
        this.formOt.get('lp_codigo').reset();
        this.formOt.get('pep2_codigo').reset();
        break;
      case part === 'LP':
        this.formOt.get('pep2_codigo').reset();
        break;
      // case part === 'ID_OPEX':
      //  this.formOt.get('cuenta_sap').reset();
      //  this.formOt.get('ceco').reset();
      // case part === 'CUENTA_SAP':
      //  this.formOt.get('ceco').reset();
    }
  }

  cancel(data: any): void {
    this.initForm();
    this.router.navigate(['app/ot/list-ot']);
  }

  touch(): void {
    Object.keys(this.formOt.controls).forEach(field => {
      const control = this.formOt.get(field);
      control.markAsTouched({
        onlySelf: true,
      });
    });

    this.formOt.markAsTouched({
      onlySelf: true,
    });
  }

  save(data: any): void {
    this.touch();
    if (this.formOt.valid) {
      const form = this.formOt.value;

      const request: OTmodel.RequestCreateOT = {
        nombre: form.nombre,
        tipo: form.tipo,
        proyecto_id: +form.proyecto_id,
        cubicacion_id: +form.cubicacion_id,
        sitio_id: +form.sitio_id,
        propietario_id: +form.gestor_id,
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
        if (form.capex_id === 'capex_provisorio') {
          request.sustento_financiero.capex_provisorio = {
            pmo_codigo: +form.pmo_codigo,
            lp_codigo: form.lp_codigo,
            pep2_codigo: form.pep2_provisorio,
          };
        } else {
          request.sustento_financiero.capex_id = +form.capex_id;
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
