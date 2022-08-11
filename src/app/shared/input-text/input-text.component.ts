import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormularioService } from 'src/app/core/service/formulario.service';

@Component({
  selector: 'zwc-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
})
export class InputTextComponent {
  @Input() Label = '';
  @Input() name_input = '';
  @Input() control: FormControl;

  constructor(private formularioService: FormularioService) {}

  errorMessageFn(errors: any): string {
    return this.formularioService.errorMessageFn(errors);
  }
}
