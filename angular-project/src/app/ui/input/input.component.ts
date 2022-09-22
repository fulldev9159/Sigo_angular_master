import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() Name = '';
  @Input() Type = 'text';
  @Input() Min = '';
  @Input() index_service = null;
  @Input() index_uo = null;
  @Output() changeInputMid = new EventEmitter<{
    value: number;
    index_service: any;
    index_uo: any;
  }>();

  @Input() errorMessageFn = errors => {
    if (errors.required) {
      return 'Este campo es requerido';
    } else if (errors.whitespace) {
      return 'Este campo es requerido';
    } else if (errors.maxlength) {
      return `Debe tener a lo más ${errors.maxlength.requiredLength} caracteres de largo`;
    } else if (errors.min) {
      return `El valor debe ser mayor o igual a ${errors.min.min}`;
    }
  };

  // <ng-container *ngIf="control.invalid && (control.dirty || control.touched)">

  constructor() {}

  ngOnInit(): void {}

  input(event: any, index_service: any, index_uo: any) {
    console.log('mid value', event.value);
    console.log('mid i serv', index_service);
    console.log('mid i uo', index_uo);
    this.changeInputMid.emit({ value: event.value, index_service, index_uo });
  }
}
