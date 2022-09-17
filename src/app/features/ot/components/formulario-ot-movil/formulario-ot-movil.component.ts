import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Dropdown, Sitio } from '@model';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { OTFacade } from '@storeOT/ot/ot.facades';
import { SustentoFinancieroFacade } from '@storeOT/sustento-financiero/sustento-financiero.facades';
import { map, Observable, Subscription, tap } from 'rxjs';

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

  sitioPlan: Sitio[];
  sitioPlan$: Observable<Dropdown[]> = this.otFacade
    .getSitioPlanProyecto$()
    .pipe(
      tap(values => (this.sitioPlan = values)),
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
    private loadingsFacade: LoadingsFacade,
    private sustentoFinancieroFacade: SustentoFinancieroFacade
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

    // TODO: REVISAR COMO OBTENGO PMO MOVIL
    this.subscription.add(
      this.form.get('sitio_id').valueChanges.subscribe(sitio_id => {
        this.sustentoFinancieroFacade.getPMO(
          this.sitioPlan.filter(sitio => sitio.id === sitio_id)[0].codigo
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
