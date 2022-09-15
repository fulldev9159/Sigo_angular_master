import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CubicacionContrato, Dropdown } from '@model';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { OTFacade } from '@storeOT/ot/ot.facades';
import { map, Observable, Subscription, tap } from 'rxjs';

@Component({
  selector: 'zwc-formulario-ot-bucle',
  templateUrl: './formulario-ot-bucle.component.html',
  styleUrls: ['./formulario-ot-bucle.component.scss'],
})
export class FormularioOtBucleComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  @Input() form: FormGroup;

  // DATA
  // cubicacionSelected: CubicacionContrato;
  cubicacionSelected$ = this.otFacade.cubicacionSelected$();
  // .pipe(tap(values => (this.cubicacionSelected = values)));
  oficinasCentrales$: Observable<Dropdown[]> = this.otFacade
    .getOficinaCentral$()
    .pipe(
      map(values => {
        let tmp = [...values];
        return tmp.sort((a, b) => (a.idafac > b.idafac ? 1 : -1));
      }),
      map(values =>
        values.map(value => ({
          name: `${value.idafac} - ${value.descripcion}`,
          code: value.id,
        }))
      )
    );

  // LOADINGS
  loadingOficinaCentral$: Observable<boolean> =
    this.loadingsFacade.sendingGetOficinaCentral$();

  constructor(
    private otFacade: OTFacade,
    private loadingsFacade: LoadingsFacade
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.cubicacionSelected$.subscribe(cubicacionSelected => {
        if (cubicacionSelected) {
          this.otFacade.getOficinaCentral(cubicacionSelected.agencia_id);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
