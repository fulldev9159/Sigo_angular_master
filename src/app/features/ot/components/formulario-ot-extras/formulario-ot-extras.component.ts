import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'zwc-formulario-ot-extras',
  templateUrl: './formulario-ot-extras.component.html',
  styleUrls: ['./formulario-ot-extras.component.scss'],
})
export class FormularioOtExtrasComponent {
  subscription: Subscription = new Subscription();
  @Input() form: FormGroup;

  // DATA
  constructor() {}
}
