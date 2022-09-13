import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'zwc-formulario-ot-base',
  templateUrl: './formulario-ot-base.component.html',
  styleUrls: ['./formulario-ot-base.component.scss'],
})
export class FormularioOtBaseComponent implements OnDestroy {
  subscription: Subscription = new Subscription();
  @Input() form: FormGroup;

  constructor() {}

  // ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
