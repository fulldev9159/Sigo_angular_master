import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CubicacionContrato, Dropdown, OTFromNumeroInterno } from '@model';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { OTFacade } from '@storeOT/ot/ot.facades';
import { NumeroInternoFacade } from '@storeOT/numero-interno/numero-interno.facades';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'zwc-formulario-ot-bucle',
  templateUrl: './formulario-ot-bucle.component.html',
  styleUrls: ['./formulario-ot-bucle.component.scss'],
})
export class FormularioOtBucleComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  @Input() form: FormGroup;
  OTsNumetoInterno: { numero_interno: string; ot_ids: number[] }[] = [];

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
  tiposNumeroInterno$: Observable<Dropdown[]> = this.numeroInternoFacade
    .getTipoDeNumeroInterno$()
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
  otsFromNumeroInterno$: Observable<OTFromNumeroInterno[]> =
    this.numeroInternoFacade.getOTFromNumeroInterno$();

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
  loadingTipoNumeroInterno$: Observable<boolean> =
    this.loadingsFacade.sendingGetTipoNumeroInterno$();
  loadingOTsFromNumeroInterno$: Observable<boolean> =
    this.loadingsFacade.sendingGetOTsFromNumeroInterno$();

  trashICon = faTrash;

  constructor(
    private otFacade: OTFacade,
    private numeroInternoFacade: NumeroInternoFacade,
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

    // 78 TODO: CONFIRMAR SI SE DEBE RESTRINGIR QUE EXISTA UN NUMERO UNICO
    // 79 TODO: CONFIRMAR SI AL CAMBIAR DE TIPO DE NUMERO SE DEBE RESETEAR TODOS LOS NUMEROS
    this.form.get('numero_interno').disable();
    this.numeroInternoFacade.getTipoDeNumeroInterno();

    this.subscription.add(
      this.form
        .get('tipo_numero_interno_id')
        .valueChanges.subscribe(tipo_numero_interno_id => {
          this.form.get('numero_interno').enable();
        })
    );

    this.subscription.add(
      this.otsFromNumeroInterno$.subscribe(otsIds => {
        if (otsIds && this.form.get('numero_interno').value !== '') {
          this.OTsNumetoInterno.push({
            numero_interno: this.form.get('numero_interno').value,
            ot_ids: [...otsIds.map(value => value.ot_id)],
          });

          this.form.get('numero_interno').reset();
        }
      })
    );
  }

  agregarNumeroInterno(): void {
    this.numeroInternoFacade.getOTFromNumeroInterno(
      +this.form.get('tipo_numero_interno_id').value,
      this.form.get('numero_interno').value
    );
  }

  deleteNumeroInterno(numero_interno: string): void {
    this.OTsNumetoInterno = this.OTsNumetoInterno.filter(
      value => value.numero_interno !== numero_interno
    );
  }

  get numeroInternoControlsValid(): boolean {
    return (
      this.form.get('tipo_numero_interno_id').valid &&
      this.form.get('numero_interno').valid
    );
  }

  get valid(): boolean {
    return this.form.valid && this.OTsNumetoInterno.length > 0;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
