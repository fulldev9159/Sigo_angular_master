import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { Cubicacion } from '@storeOT/features/cubicacion/cubicacion.model';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import { Lp, Pep2, Plan, PMO, Site } from '@storeOT/features/ot/ot.model';
import { Observable, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-form-ot',
  templateUrl: './form-ot.component.html',
  styleUrls: ['./form-ot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormOtComponent implements OnInit, OnDestroy {

  // declarations
  public formOt: FormGroup;
  public cubicaciones$: Observable<Cubicacion[]>;
  public plans: Plan[];
  public planes$: Observable<Plan[]> = of([]);
  public sitios: Site[];
  public sitios$: Observable<Site[]> = of([]);
  public pmos: PMO[];
  public pmos$: Observable<PMO[]> = of([]);
  public lps: Lp;
  public lps$: Observable<any> = of();
  public pep2s: Pep2[];
  public pep2s$: Observable<Pep2[]> = of([]);
  private destroyInstance$: Subject<boolean> = new Subject();

  constructor(
    private fb: FormBuilder,
    private otFacade: OtFacade,
    private cubageFacade: CubicacionFacade
  ) { }

  ngOnInit(): void {
    // inicializamos formulario reactivo
    this.initForm();

    // rescatamos data inicial
    this.cubicaciones$ = this.cubageFacade.getCubicacion$();
    this.planes$ = this.otFacade.getPlans$().pipe(map(plans => { this.plans = plans; return plans }));
    this.sitios$ = this.otFacade.getSites$().pipe(map(sitios => { this.sitios = sitios; return sitios }));
    this.pmos$ = this.otFacade.getPmos$().pipe(map(pmos => { this.pmos = pmos; return pmos }));
    this.lps$ = this.otFacade.getLps$().pipe(map(lps => { this.lps = lps; return lps.lineas_presupuestarias }));
    this.pep2s$ = this.otFacade.getPep2s$().pipe(map(pep2s => { this.pep2s = pep2s; return pep2s }));
  }

  ngOnDestroy(): void {
    this.destroyInstance$.next(true);
    this.destroyInstance$.complete();
  }

  initForm() {
    this.formOt = this.fb.group({
      id: null,
      name: [null, Validators.required],
      tipo: [null, Validators.required],
      fecha_inicio: [null, Validators.required],
      fecha_termino: [null, Validators.required],
      cubicacion_id: [null, Validators.required],
      plan_despliegue_id: [null, Validators.required],
      plan_nombre: null,
      emplazamiento_id: [null, Validators.required],
      pmo_codigo: [null, Validators.required],
      linea_presupuestaria_codigo: [null, Validators.required],
      pep2_codigo: null,
      observaciones: null
    });

    // detectamos cambios en formulario
    this.detectChangesForm();
  }

  detectChangesForm() {
    this.formOt
      .get('cubicacion_id')
      .valueChanges
      .pipe(takeUntil(this.destroyInstance$))
      .subscribe(cubicacionId => {
        if (cubicacionId) {
          // actualizamos store para
          // Planes según cubicación
          this.otFacade.getPlansSuccess([{
            id: 12312,
            nombre: 'nombre plan',
            metas: 'metas',
            vendor: 'vendor',
            tipo: 'tipo',
          }]);

          // refrescamos parte de
          //  formulario al cambiar cubicación
          this.resetForm('CUBICATION');
        }
      });

    this.formOt
      .get('plan_despliegue_id')
      .valueChanges
      .pipe(takeUntil(this.destroyInstance$))
      .subscribe(plan_despliegue_id => {
        if (plan_despliegue_id) {

          // actualizamos nombre plan seleccionado
          const plan = this.plans.find(p => p.id === plan_despliegue_id);
          if (plan) {
            this.formOt.get('plan_nombre').setValue(plan.nombre);
          }

          // actualizamos store para
          // Sitios según plan
          this.otFacade.getSitesSuccess([{
            id: 12312,
            nombre: 'nombre site',
            codigo: 'metas',
            latitud: 'vendor',
            longitud: 'tipo',
            direccion: 'tipo'
          }]);

          // refrescamos parte de
          //  formulario al cambiar plan
          this.resetForm('PLAN');
        }
      });

    this.formOt
      .get('emplazamiento_id')
      .valueChanges
      .pipe(takeUntil(this.destroyInstance$))
      .subscribe(emplazamiento_id => {
        if (emplazamiento_id) {

          // actualizamos store para
          // PMOS según site
          this.otFacade.getPmosSuccess([{
            codigo: 'PMOS',
          }]);

          // refrescamos parte de
          //  formulario al cambiar site
          this.resetForm('SITE');
        }
      });

    this.formOt
      .get('pmo_codigo')
      .valueChanges
      .pipe(takeUntil(this.destroyInstance$))
      .subscribe(pmo_codigo => {
        if (pmo_codigo) {
          // actualizamos store para
          // Lp según pmo
          this.otFacade.getLpsSuccess({ lineas_presupuestarias: ['-', 'asdasdsds'] });

          // refrescamos parte de
          //  formulario al cambiar pmo
          this.resetForm('PMO');
        }
      });
    this.formOt
      .get('linea_presupuestaria_codigo')
      .valueChanges
      .pipe(takeUntil(this.destroyInstance$))
      .subscribe(linea_presupuestaria_codigo => {
        if (linea_presupuestaria_codigo) {
          // actualizamos store para
          // Pep2 según lp
          this.otFacade.getPep2sSuccess([{
            linea_presupuestaria_id: 50,
            pep2_codigo: 'P-1594-20-0302-01102-516'
          }]);

          // refrescamos parte de
          //  formulario al cambiar lp
          this.resetForm('LP');
        }
      });
  }

  resetForm(part: string) {
    switch (true) {
      case part === 'CUBICATION':
        this.formOt.get('plan_despliegue_id').reset();
        this.formOt.get('emplazamiento_id').reset();
        this.formOt.get('pmo_codigo').reset();
        this.formOt.get('linea_presupuestaria_codigo').reset();
        this.formOt.get('pep2_codigo').reset();
        break;
      case part === 'PLAN':
        this.formOt.get('emplazamiento_id').reset();
        this.formOt.get('pmo_codigo').reset();
        this.formOt.get('linea_presupuestaria_codigo').reset();
        this.formOt.get('pep2_codigo').reset();
        break;
      case part === 'SITE':
        this.formOt.get('pmo_codigo').reset();
        this.formOt.get('linea_presupuestaria_codigo').reset();
        this.formOt.get('pep2_codigo').reset();
        break;
      case part === 'PMO':
        this.formOt.get('linea_presupuestaria_codigo').reset();
        this.formOt.get('pep2_codigo').reset();
        break;
      case part === 'LP':
        this.formOt.get('pep2_codigo').reset();
        break;
    }
  }

  cancel(data: any) {
    this.initForm();
  }

  save(data: any) {
    const form = this.formOt.value;
    form.id = (+(new Date())).toString();
    this.otFacade.replyOt(form);
    this.formOt.reset();
  }

}
