import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import { Cubicacion, Plan, Sitio } from '@data';

@Component({
  selector: 'app-plan-proyecto-form',
  templateUrl: './plan-proyecto-form.component.html',
  styleUrls: ['./plan-proyecto-form.component.scss'],
})
export class PlanProyectoFormComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  planes$: Observable<Plan[]> = of([]);
  sitios$: Observable<Sitio[]> = of([]);

  @Input() form: FormGroup;

  cubicacion: Cubicacion;
  @Input('cubicacion')
  set cubicacionInput(cubicacion: Cubicacion) {
    this.resetPlanProyectoFormControl();

    this.cubicacion = cubicacion;
    if (cubicacion !== null && cubicacion !== undefined) {
      this.otFacade.getPlans(+cubicacion.region_id);
    } else {
      this.form.get('plan_proyecto_id').disable();
    }
  }

  constructor(private otFacade: OtFacade) {}

  ngOnInit(): void {
    this.planes$ = this.otFacade.getPlans$().pipe(
      map(proveedores => proveedores || []),
      tap(proveedores => this.checkPlanProyectoAndEnable(proveedores))
    );

    this.sitios$ = this.otFacade.getSitesSelector$().pipe(
      map(sitios => sitios || []),
      tap(sitios => this.checkSitiosAndEnable(sitios))
    );

    this.subscription.add(
      this.form
        .get('plan_proyecto_id')
        .valueChanges.pipe(withLatestFrom(this.planes$))
        .subscribe(([plan_proyecto_id, planes]) => {
          this.resetSitioFormControl();
          if (plan_proyecto_id !== null && plan_proyecto_id !== undefined) {
            // const plan = planes.find(p => +p.id === +plan_proyecto_id);
            if (this.cubicacion) {
              this.otFacade.getSitesAction(
                +plan_proyecto_id,
                +this.cubicacion.region_id
              );
            }
          } else {
            this.checkSitiosAndEnable([]);
          }
        })
    );
  }

  resetPlanProyectoFormControl(): void {
    if (this.form) {
      this.form.get('plan_proyecto_id').reset();
    }
    this.otFacade.resetPlanProyecto();
  }

  resetSitioFormControl(): void {
    if (this.form) {
      this.form.get('sitio_id').reset();
    }
    this.otFacade.resetSitio();
  }

  checkPlanProyectoAndEnable(planes: Plan[]): void {
    if (planes.length > 0) {
      this.form.get('plan_proyecto_id').enable();
    } else {
      this.form.get('plan_proyecto_id').disable();
    }
  }

  checkSitiosAndEnable(sitios: Sitio[]): void {
    if (sitios.length > 0) {
      this.form.get('sitio_id').enable();
    } else {
      this.form.get('sitio_id').disable();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  touch(): void {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsTouched({
        onlySelf: true,
      });
    });

    this.form.markAsTouched({
      onlySelf: true,
    });
  }

  get valid(): boolean {
    return this.form.valid;
  }
}
