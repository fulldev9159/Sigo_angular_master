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
  cubicacionSelected$ = this.otFacade.cubicacionSelected$();
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
  solicitadoPor$: Observable<Dropdown[]> = this.otFacade
    .getSolicitadoPor$()
    .pipe(
      map(values => {
        let tmp = [...values];
        return tmp.sort((a, b) => (a.descripcion > b.descripcion ? 1 : -1));
      }),
      map(values =>
        values.map(value => ({
          name: value.descripcion,
          code: value.id,
        }))
      )
    );
  comunasFromCub$: Observable<Dropdown[]> = this.otFacade
    .getComunasFromCub$()
    .pipe(
      map(values => {
        let tmp = [...values];
        return tmp.sort((a, b) => (a.comuna_nombre > b.comuna_nombre ? 1 : -1));
      }),
      map(values =>
        values.map(value => ({
          name: value.comuna_nombre,
          code: value.comuna_id,
        }))
      )
    );
  tipoDeRed$: Observable<Dropdown[]> = this.otFacade.getTipoDeRed$().pipe(
    map(values => {
      let tmp = [...values];
      return tmp.sort((a, b) => (a.descripcion > b.descripcion ? 1 : -1));
    }),
    map(values =>
      values.map(value => ({
        name: value.descripcion,
        code: value.id,
      }))
    )
  );
  tipoDeTrabajoFromCub$: Observable<Dropdown[]> = this.otFacade
    .getTipoDeTrabajoFromCub$()
    .pipe(
      map(values => {
        let tmp = [...values];
        return tmp.sort((a, b) =>
          a.tipo_trabajo_descripcion > b.tipo_trabajo_descripcion ? 1 : -1
        );
      }),
      map(values =>
        values.map(value => ({
          name: value.tipo_trabajo_descripcion,
          code: value.tipo_trabajo_id,
        }))
      )
    );

  areaDeNegocio$: Observable<Dropdown[]> = this.otFacade
    .getAreaDeNegocio$()
    .pipe(
      map(values => {
        let tmp = [...values];
        return tmp.sort((a, b) => (a.descripcion > b.descripcion ? 1 : -1));
      }),
      map(values =>
        values.map(value => ({
          name: value.descripcion,
          code: value.id,
        }))
      )
    );

  // LOADINGS
  loadingOficinaCentral$: Observable<boolean> =
    this.loadingsFacade.sendingGetOficinaCentral$();
  loadingSolicitadoPor$: Observable<boolean> =
    this.loadingsFacade.sendingGetSolicitadoPor$();
  loadingComunasFromCub$: Observable<boolean> =
    this.loadingsFacade.sendingGetComunasFromCub$();
  loadingTipoDeRed$: Observable<boolean> =
    this.loadingsFacade.sendingGetTipoDeRed$();
  loadingTipoDeTrabajoFromCub$: Observable<boolean> =
    this.loadingsFacade.sendingGetTipoDeTrabajoFromCub$();
  loadingAreaDeNegocio$: Observable<boolean> =
    this.loadingsFacade.sendingGetAreaDeNegocio$();

  constructor(
    private otFacade: OTFacade,
    private loadingsFacade: LoadingsFacade
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.cubicacionSelected$.subscribe(cubicacionSelected => {
        if (cubicacionSelected) {
          this.otFacade.getOficinaCentral(cubicacionSelected.agencia_id);
          this.otFacade.getSolicitadoPor();
          this.otFacade.getComunasFromCub(cubicacionSelected.cubicacion_id);
          this.otFacade.getTipoDeRed();
          this.otFacade.getTipoDeTrabajoFromCub(
            cubicacionSelected.cubicacion_id
          );
          this.otFacade.getAreaDeNegocio();
        }
      })
    );
  }

  get valid(): boolean {
    return this.form.valid;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
