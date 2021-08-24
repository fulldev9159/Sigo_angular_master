import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent implements OnInit {
  @Input() control: FormControl;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() ID = '';
  @Input() cols = 30;
  @Input() rows = 2;

  // tslint:disable-next-line:no-input-rename
  @Input('type') inputType = 'text';
  @Input() errorMessageFn = errors => {
    if (errors.required) {
      return 'Este campo es requerido';
    } else if (errors.whitespace) {
      return 'Este campo es requerido';
    } else if (errors.maxlength) {
      return `Debe tener a lo más ${errors.maxlength.requiredLength} caracteres de largo`;
    }
  };

  constructor() {}

  ngOnInit(): void {}
}
