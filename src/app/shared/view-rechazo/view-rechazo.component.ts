import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Dropdown, MotivoRechazo } from '@model';

@Component({
  selector: 'zwc-view-rechazo',
  templateUrl: './view-rechazo.component.html',
  styleUrls: ['./view-rechazo.component.scss'],
})
export class ViewRechazoComponent {
  // 98 TODO: PROGRAMAR/MIGRAR RECHAZO

  @Input() motivosRehazo: Dropdown[];

  formRechazoControls = {
    tipo_id: new FormControl(null, [Validators.required]),
    motivo: new FormControl(null, [
      Validators.required,
      // this.noWhitespace,
      Validators.maxLength(200),
    ]),
  };
  formRechazo: FormGroup = new FormGroup(this.formRechazoControls);

  constructor() {}

  get valid(): boolean {
    return this.formRechazo.valid;
  }
}
