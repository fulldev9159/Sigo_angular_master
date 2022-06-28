import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() DisplayLabelMode = 'up';
  @Input() control: FormControl;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() ID = '';
  // tslint:disable-next-line:no-input-rename
  @Input('type') inputType = 'text';
  // tslint:disable-next-line:no-input-rename
  @Input('min') min = '';
  @Input() errorMessageFn = errors => {
    if (errors.required) {
      return 'Este campo es requerido';
    } else if (errors.whitespace) {
      return 'Este campo es requerido';
    } else if (errors.maxlength) {
      return `Debe tener a lo más ${errors.maxlength.requiredLength} caracteres de largo`;
    } else if (errors.min) {
      return 'El valor debe ser mayor o igual a 1';
    }
  };

  // <ng-container *ngIf="control.invalid && (control.dirty || control.touched)">

  constructor() {}

  ngOnInit(): void {}
}
