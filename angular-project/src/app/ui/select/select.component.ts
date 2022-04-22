import { Component, OnInit, Input, AfterContentChecked } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit, AfterContentChecked {
  @Input() control: FormControl;
  @Input() label = '';
  @Input() ID = '';
  @Input() errorMessageFn = errors => {
    if (errors.required) {
      return 'Este campo es requerido';
    } else if (errors.whitespace) {
      return 'Este campo es requerido';
    } else if (errors.maxlength) {
      return `Debe tener a lo más ${errors.maxlength.requiredLength} caracteres de largo`;
    }
    return 'Este campo es inválido';
  };

  constructor() {}

  ngOnInit(): void {}

  ngAfterContentChecked(): void {
    if (this.control) {
      this.control.setValue(this.control.value, { emitEvent: false });
      this.control.updateValueAndValidity({ emitEvent: false });
    }
  }
}
