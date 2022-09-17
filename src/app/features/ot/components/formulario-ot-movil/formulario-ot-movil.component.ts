import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Dropdown } from '@model';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { OTFacade } from '@storeOT/ot/ot.facades';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'zwc-formulario-ot-movil',
  templateUrl: './formulario-ot-movil.component.html',
  styleUrls: ['./formulario-ot-movil.component.scss'],
})
export class FormularioOtMovilComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  @Input() form: FormGroup;

  // DATA
  planDeProyecto$: Observable<Dropdown[]> = this.otFacade
    .getPlanDeProyecto$()
    .pipe(
      map(values => {
        let tmp = [...values];
        return tmp.sort((a, b) => (a.nombre > b.nombre ? 1 : -1));
      }),
      map(values =>
        values.map(value => ({
          name: value.nombre,
          code: value.id,
        }))
      )
    );
  sitioPlan$: Observable<Dropdown[]> = this.otFacade
    .getSitioPlanProyecto$()
    .pipe(
      map(values => {
        let tmp = [...values];
        return tmp.sort((a, b) => (a.nombre > b.nombre ? 1 : -1));
      }),
      map(values =>
        values.map(value => ({
          name: value.nombre,
          code: value.id,
        }))
      )
    );
  // LOADINGS
  loadingPlanDeProyecto$: Observable<boolean> =
    this.loadingsFacade.sendingGetPlanDeProyecto$();
  loadingSitioPlan$: Observable<boolean> =
    this.loadingsFacade.sendingGetSitioPlan$();

  constructor(
    private otFacade: OTFacade,
    private loadingsFacade: LoadingsFacade
  ) {}

  ngOnInit(): void {
    this.form.get('sitio_id').disable();
    this.otFacade.getPlanDeProyecto();

    this.subscription.add(
      this.form
        .get('plan_proyecto_id')
        .valueChanges.subscribe(plan_proyecto_id => {
          if (plan_proyecto_id) {
            this.otFacade.getSitioPlanProyecto(+plan_proyecto_id);
            this.form.get('sitio_id').enable();
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
