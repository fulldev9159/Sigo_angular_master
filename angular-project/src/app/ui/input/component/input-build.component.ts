import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-builder',
  templateUrl: './input-build.component.html',
  styleUrls: ['./input-build.component.scss'],
})
export class InputBuildComponent implements OnInit {
  @Input() control: FormControl;
  @Input() Name = '';
  @Input() Type = 'text';
  @Input() Min = '';
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

  constructor() {}

  ngOnInit(): void {}
}
