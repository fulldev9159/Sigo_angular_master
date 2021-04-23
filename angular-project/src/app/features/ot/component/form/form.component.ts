import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Cubicacion } from '@storeOT/features/cubicacion/cubicacion.model';
import { Lp, Pep2, Plan, PMO, Site } from '@storeOT/features/ot/ot.model';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  @Output() public cancel = new EventEmitter();
  @Output() public save = new EventEmitter();
  private destroyInstance$: Subject<boolean> = new Subject();

  constructor() { }

  ngOnInit(): void {
  }

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

}
