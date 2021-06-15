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
import {
  Lp,
  Pep2,
  Plan,
  PMO,
  Site,
  CECO,
  CuentaSap,
  IDOpex,
} from '@storeOT/features/ot/ot.model';
import { MessageService } from 'primeng/api';
import { Observable, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-ot',
  templateUrl: './form-ot.component.html',
  styleUrls: ['./form-ot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormOtComponent implements OnInit, OnDestroy {
  // declarations
  public formOt: FormGroup;
  public cubage = null;
  public authLogin = null;
  public cubicaciones = null;
  public cubicaciones$: Observable<Cubicacion[]>;
  public plans: Plan[];
  public planes$: Observable<Plan[]> = of([]);
  public sitios = null;
  public sitios$: Observable<Site[]> = of([]);
  public pmos = null;
  public pmos$: Observable<PMO[]> = of([]);
  public lps: Lp[];
  public lps$: Observable<any> = of();
  public pep2s: Pep2[];
  public pep2s$: Observable<Pep2[]> = of([]);
  public ids_opex = null;
  public ids_opex$: Observable<IDOpex[]> = of([]);
  public cuentas_sap: CuentaSap[];
  public cuentas_sap$: Observable<CuentaSap[]> = of([]);
  public cecos: CECO[];
  public cecos$: Observable<CECO[]> = of([]);
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
    // inicializamos formulario reactivo
    this.initForm();

    // rescatamos data inicial

    this.authFacade
      .getLogin$()
      .pipe(takeUntil(this.destroyInstance$))
      .subscribe((authLogin) => {
        if (authLogin) {
          this.authLogin = authLogin;
          this.formOt.get('token').setValue(this.authLogin.token);
          this.formOt.get('gestor_id').setValue(this.authLogin.usuario_id);
          this.cubageFacade.getCubicacion(+authLogin.perfiles[0].id);
        }
      });

    this.cubicaciones$ = this.cubageFacade
      .getCubicacion$()
      .pipe(map((cubicaciones) => (this.cubicaciones = cubicaciones)));
    this.planes$ = this.otFacade.getPlans$().pipe(
      map((plans) => {
        this.plans = plans;
        return plans;
      })
    );
    this.sitios$ = this.otFacade.getSites$().pipe(
      map(
        (sitios) =>
          (this.sitios = sitios.map((x) => ({
            ...x,
            nombre: `${x.codigo} - ${x.nombre}`,
          })))
      )
    );
    this.pmos$ = this.otFacade
      .getPmos$()
      .pipe(map((pmos) => (this.pmos = pmos)));
    this.lps$ = this.otFacade.getLps$().pipe(
      map((lps) => {
        this.lps = lps;
        return lps;
      })
    );
    this.pep2s$ = this.otFacade.getPep2s$().pipe(
      map((pep2s) => {
        this.pep2s = pep2s;
        return pep2s;
      })
    );
    this.ids_opex$ = this.otFacade
      .getIDsOpex$()
      .pipe(map((ids_opex) => (this.ids_opex = ids_opex)));
    this.cuentas_sap$ = this.otFacade.getCuentaSAP$().pipe(
      map((cuentas_sap) => {
        this.cuentas_sap = cuentas_sap;
        return cuentas_sap;
      })
    );
    this.cecos$ = this.otFacade.getCECO$().pipe(
      map((cecos) => {
        this.cecos = cecos;
        return cecos;
      })
    );
  }

  ngOnDestroy(): void {
    this.destroyInstance$.next(true);
    this.destroyInstance$.complete();
  }

  // DUDA: por qué el pep2 parte con ese código?
  initForm(): void {
    this.formOt = this.fb.group({
      id: null,
      token: null,
      nombre: [null, Validators.required],
      tipo: [null, Validators.required],
      fecha_inicio: [null, Validators.required],
      fecha_fin: [null, Validators.required],
      cubicacion_id: [null, Validators.required],
      plan_proyecto_id: [null, Validators.required],
      plan_nombre: null,
      costos: 'capex',
      sitio_id: [null, Validators.required],
      pmo_codigo: [null, Validators.required],
      id_opex_codigo: [null, Validators.required],
      lp_codigo: [null, Validators.required],
      cuenta_sap_codigo: [null, Validators.required],
      ceco_codigo: [null, Validators.required],
      pep2_codigo: 'P-0404-20-1318-40005-807',
      observaciones: null,
      pep2_provisorio: false,
      gestor_id: null,
    });

    // detectamos cambios en formulario
    this.detectChangesForm();
  }

  // DUDA: por qué está comentadp el reset ?
  detectChangesForm(): void {
    this.formOt
      .get('cubicacion_id')
      .valueChanges.pipe(takeUntil(this.destroyInstance$))
      .subscribe((cubicacionId) => {
        if (cubicacionId) {
          // actualizamos store para
          // Planes según cubicación
          this.cubage = this.cubicaciones.find((c) => +c.id === +cubicacionId);
          if (this.cubage) {
            this.otFacade.getPlans({
              token: this.authLogin.token,
              region_id: this.cubage.region_id,
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
      .subscribe((plan_proyecto_id) => {
        if (plan_proyecto_id) {
          // actualizamos nombre plan seleccionado
          const plan = this.plans.find((p) => p.id === plan_proyecto_id);
          if (plan) {
            this.formOt.get('plan_nombre').setValue(plan.nombre);
          }

          // Obtenemos el id de la cubicacion obtenida
          // const id_cubicacion_control = 'cubicacion_id'
          // const id_cubicacion = this.formOt.controls[id_cubicacion_control].value

          // this.cubage = this.cubicaciones.find((c) => +c.id === +id_cubicacion);

          // actualizamos store para
          // Sitios según plan
          this.otFacade.getSites({
            plan_proyecto_id,
            region_id: this.cubage.region_id,
          });

          // refrescamos parte de
          //  formulario al cambiar plan
          // this.resetForm('PLAN');
        }
      });

    this.formOt
      .get('sitio_id')
      .valueChanges.pipe(takeUntil(this.destroyInstance$))
      .subscribe((sitio_id) => {
        if (sitio_id) {
          // actualizamos store para
          // PMOS según site
          const site = this.sitios.find((s) => +s.id === +sitio_id);
          const id_sustento_controls = 'costos';
          const rbutton = this.formOt.controls[id_sustento_controls].value;
          if (site) {
            this.otFacade.getPmos({
              sitio_codigo: site.codigo,
            });
            // if (rbutton === 'capex') {
            //   this.otFacade.getPmos({
            //     sitio_codigo: site.codigo,
            //   });
            // } else if (rbutton === 'opex') {
            //   // NUNCA ENTRA ACA! -> SACAR
            //   this.otFacade.getIDsOpex();
            // }
          }
          // refrescamos parte de
          //  formulario al cambiar site
          // this.resetForm('SITE');
        }
      });

    this.formOt
      .get('pmo_codigo')
      .valueChanges.pipe(takeUntil(this.destroyInstance$))
      .subscribe((pmo_codigo) => {
        if (pmo_codigo) {
          // actualizamos store para
          // Lp según pmo
          this.otFacade.getLps({ token: this.authLogin.token, pmo_codigo });

          // refrescamos parte de
          //  formulario al cambiar pmo
          this.resetForm('PMO');
        }
      });

    this.formOt
      .get('id_opex_codigo')
      .valueChanges.pipe(takeUntil(this.destroyInstance$))
      .subscribe((id_opex_codigo) => {
        if (id_opex_codigo) {
          // actualizamos store para
          // cuenta SAP según id_opex_codigo
          this.otFacade.getCuentaSAP({
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
      .subscribe((cuenta_sap_codigo) => {
        if (cuenta_sap_codigo) {
          // actualizamos store para
          // ceco según cuenta_sap_codigo
          const id_opex_controls = 'id_opex_codigo';
          const id_opex = this.formOt.controls[id_opex_controls].value;
          this.otFacade.getCECO({
            id_opex_codigo: id_opex,
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
      .subscribe((lp_codigo) => {
        if (lp_codigo) {
          // actualizamos store para
          // Pep2 según lp
          this.otFacade.getPep2s({
            token: this.authLogin.token,
            pmo_codigo: this.formOt.value.pmo_codigo,
            lp_codigo,
          });

          // refrescamos parte de
          //  formulario al cambiar lp
          // this.resetForm('LP');
        }
      });
    this.formOt
      .get('costos')
      .valueChanges.pipe(takeUntil(this.destroyInstance$))
      .subscribe((costos) => {
        if (costos) {
          const id_sitio_controls = 'sitio_id';
          const sitio_id = this.formOt.controls[id_sitio_controls].value;
          const site = this.sitios.find((s) => +s.id === +sitio_id);
          // const id_sustento_controls = 'costos'
          // const rbutton = this.formOt.controls[id_sustento_controls].value
          if (costos === 'capex') {
            this.otFacade.getPmos({
              sitio_codigo: site.codigo,
            });
          } else if (costos === 'opex') {
            this.otFacade.getIDsOpex();
          }
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
  }

  save(data: any): void {
    const form = { ...this.formOt.value, token: this.authLogin.token };
    form.id = (+new Date()).toString();
    form.pep2_codigo = 'P-0404-20-1318-40005-807';
    // this.otFacade.replyOt(form);
    delete form.id;
    this.otFacade.postOt(form);
    this.formOt.reset();
    this.messageService.add({
      severity: 'success',
      summary: 'Registro guardado',
      detail: 'Registro se ha generado con Éxito!',
    });
    this.router.navigate(['app/ot/list-ot']);
  }
}
