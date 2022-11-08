import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Dropdown, OTFromNumeroInterno } from '@model';
import { NumeroInternoFacade } from '@storeOT/numero-interno/numero-interno.facades';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'zwc-formulario-ot-ordinario',
  templateUrl: './formulario-ot-ordinario.component.html',
  styleUrls: ['./formulario-ot-ordinario.component.scss'],
})
export class FormularioOtOrdinarioComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  @Input() form: FormGroup;
  OTsNumetoInterno: { numero_interno: string; ot_ids: number[] }[] = [];

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
  loadingTipoNumeroInterno$: Observable<boolean> =
    this.loadingsFacade.sendingGetTipoNumeroInterno$();
  loadingOTsFromNumeroInterno$: Observable<boolean> =
    this.loadingsFacade.sendingGetOTsFromNumeroInterno$();

  trashICon = faTrash;

  constructor(
    private numeroInternoFacade: NumeroInternoFacade,
    private loadingsFacade: LoadingsFacade
  ) {}

  ngOnInit(): void {
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
    return this.form.valid; //  && this.OTsNumetoInterno.length > 0;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
