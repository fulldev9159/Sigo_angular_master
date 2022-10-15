import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormularioService } from 'src/app/core/service/formulario.service';

@Component({
  selector: 'zwc-input-alert',
  templateUrl: './input-alert.component.html',
  styleUrls: ['./input-alert.component.scss'],
})
export class InputAlertComponent {
  @Input() control: FormControl;

  constructor(private formularioService: FormularioService) {}

  errorMessageFn(errors: any): string {
    return this.formularioService.errorMessageFn(errors);
  }
}
