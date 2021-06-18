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

  get sfinanciero(): string {
    return this.formOt.value.costos;
  }
}
