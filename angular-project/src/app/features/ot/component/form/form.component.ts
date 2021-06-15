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
import {
  CECO,
  CuentaSap,
  IDOpex,
  Lp,
  Pep2,
  Plan,
  PMO,
  Site,
} from '@storeOT/features/ot/ot.model';
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
  @Input() planes: Plan[];
  @Input() sitios: Site[];
  @Input() pmos: PMO[];
  @Input() lps: Lp[];
  @Input() pep2s: Pep2[];
  @Input() ids_opex: IDOpex[];
  @Input() cuentas_sap: CuentaSap[];
  @Input() cecos: CECO[];
  public capex = false;
  public opex = false;
  @Output() public cancel = new EventEmitter();
  @Output() public save = new EventEmitter();
  private destroyInstance$: Subject<boolean> = new Subject();
  // selectedCategory: any = null;
  // categories: any[] = [{name: 'Capex', key: 'C'}, {name: 'Opex', key: 'O'}];

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyInstance$.next(true);
    this.destroyInstance$.complete();
    // this.selectedCategory = this.categories[1];
  }

  cancelAction(): void {
    this.cancel.emit(true);
  }

  saveAction(): void {
    this.save.emit(true);
  }

  get sfinanciero(): string {
    const idSf = 'costos';
    return this.formOt.controls[idSf].value;
  }
}
