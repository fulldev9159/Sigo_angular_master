import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'zwc-formulario-ot-sustento-financiero',
  templateUrl: './formulario-ot-sustento-financiero.component.html',
  styleUrls: ['./formulario-ot-sustento-financiero.component.scss'],
})
export class FormularioOtSustentoFinancieroComponent {
  subscription: Subscription = new Subscription();
  @Input() form: FormGroup;

  constructor() {}
}
