import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'zwc-formulario-ot-ordinario',
  templateUrl: './formulario-ot-ordinario.component.html',
  styleUrls: ['./formulario-ot-ordinario.component.scss'],
})
export class FormularioOtOrdinarioComponent {
  @Input() form: FormGroup;

  constructor() {}
}
