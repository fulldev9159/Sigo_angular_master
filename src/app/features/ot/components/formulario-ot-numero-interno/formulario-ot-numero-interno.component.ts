import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import {
  FormControl,
  FormArray,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { OTFromNumeroInterno } from '@model';
import * as CustomValidators from '@sharedOT/validators';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { NumeroInternoFacade } from '@storeOT/numero-interno/numero-interno.facades';
import { Subscription, Observable } from 'rxjs';
import { LogService } from '@log';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'zwc-formulario-ot-numero-interno',
  templateUrl: './formulario-ot-numero-interno.component.html',
  styleUrls: ['./formulario-ot-numero-interno.component.scss'],
})
export class FormularioOtNumeroInternoComponent implements OnInit, OnDestroy {
  trashICon = faTrash;

  subscription: Subscription = new Subscription();

  @Input() tipoNumeroInternoFormControl?: FormControl;
  @Input() otsNumeroInternoFormArray?: FormArray;

  form: FormGroup = new FormGroup({
    numero_interno: new FormControl('', [
      Validators.required,
      CustomValidators.NoWhitespace,
      Validators.maxLength(255),
    ]),
  });

  otsFromNumeroInterno$: Observable<OTFromNumeroInterno[]> =
    this.numeroInternoFacade.getOTFromNumeroInterno$();
  loadingOTsFromNumeroInterno$: Observable<boolean> =
    this.loadingsFacade.sendingGetOTsFromNumeroInterno$();

  constructor(
    private numeroInternoFacade: NumeroInternoFacade,
    private loadingsFacade: LoadingsFacade,
    private logger: LogService
  ) {}

  ngOnInit(): void {
    this.form.get('numero_interno').disable();

    this.subscription.add(
      this.otsFromNumeroInterno$.subscribe((otsIds: any) => {
        if (otsIds && this.form.get('numero_interno').value !== '') {
          const item = {
            numero_interno: this.form.get('numero_interno').value,
            ot_ids: [...(otsIds ?? []).map((value: any) => value.ot_id)],
          };

          this.logger.debug('add item', item);

          if (this.otsNumeroInternoFormArray) {
            const numeroInterno = this.form.get('numero_interno').value;
            this.otsNumeroInternoFormArray.push(
              new FormGroup({
                numero_interno: new FormControl(item.numero_interno, []),
                ot_ids: new FormArray(
                  item.ot_ids.map(val => new FormControl(val, []))
                ),
              })
            );
          } else {
            this.logger.warn('ots numero interno no inicializado');
          }

          this.form.get('numero_interno').reset();
        }
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tipoNumeroInternoFormControl']) {
      this.subscription.add(
        this.tipoNumeroInternoFormControl.valueChanges.subscribe(tipo => {
          if (tipo === null) {
            this.form.get('numero_interno').disable();
          } else {
            this.form.get('numero_interno').enable();
          }

          if (this.otsNumeroInternoFormArray) {
            while (this.otsNumeroInternoFormArray.length > 0) {
              this.otsNumeroInternoFormArray.removeAt(
                this.otsNumeroInternoFormArray.length - 1
              );
            }
          }
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get valid(): boolean {
    return (
      (this.tipoNumeroInternoFormControl?.valid ?? false) && this.form.valid
    );
  }

  agregarNumeroInterno(): void {
    if (this.valid) {
      this.numeroInternoFacade.getOTFromNumeroInterno(
        +this.tipoNumeroInternoFormControl.value,
        this.form.get('numero_interno').value
      );
    }
  }

  deleteNumeroInterno(index: number): void {
    if (this.otsNumeroInternoFormArray) {
      this.otsNumeroInternoFormArray.removeAt(index);
    }
  }
}
