import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Cubicacion } from '@storeOT/features/cubicacion/cubicacion.model';
import * as OTmodel from '@storeOT/features/ot/ot.model';
import { Observable, Subject } from 'rxjs';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit, OnDestroy {
  // declarations
  @Input() formOt: FormGroup;
  @Input() cubicaciones: Cubicacion[];
  @Input() planes: OTmodel.Plan[];
  @Input() sitios: OTmodel.Site[];
  @Input() pmos: OTmodel.PMO[];
  @Input() lps: OTmodel.Lp[];
  @Input() pep2s: OTmodel.Pep2[];
  @Input() ids_opex: OTmodel.IDOpex[];
  @Input() cuentas_sap: OTmodel.CuentaSap[];
  @Input() cecos: OTmodel.CECO[];
  @Input() proyectos: OTmodel.Proyecto[];
  // public capex = false;
  // public opex = false;
  @Output() public cancel = new EventEmitter();
  @Output() public save = new EventEmitter();
  private destroyInstance$: Subject<boolean> = new Subject();

  msgsWrongDates = [
    {
      severity: 'error',
      summary: 'ERROR',
      detail: 'La fecha de fin no puede ser inferior a la fecha de inicio',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyInstance$.next(true);
    this.destroyInstance$.complete();
  }

  cancelAction(): void {
    this.cancel.emit(true);
  }

  saveAction(): void {
    this.save.emit(true);
  }

  get invalidDates(): boolean {
    if (
      this.formOt.get('fecha_inicio').valid &&
      this.formOt.get('fecha_fin').valid
    ) {
      const { fecha_inicio, fecha_fin } = this.formOt.getRawValue();
      const sdDay = fecha_inicio.getDate();
      const sdMonth = fecha_inicio.getMonth() + 1;
      const sdYear = fecha_inicio.getFullYear();

      const edDay = fecha_fin.getDate();
      const edMonth = fecha_fin.getMonth() + 1;
      const edYear = fecha_fin.getFullYear();

      if (sdYear > edYear) {
        return true;
      }
      if (sdMonth > edMonth) {
        return true;
      }
      if (sdDay > edDay) {
        return true;
      }
    }

    return false;
  }

  get sfinanciero(): string {
    return this.formOt.value.costos;
  }
}
