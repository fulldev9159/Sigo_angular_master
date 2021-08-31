import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detalle-adjudicacion-form',
  templateUrl: './detalle-adjudicacion-form.component.html',
  styleUrls: ['./detalle-adjudicacion-form.component.scss'],
})
export class DetalleAdjudicacionFormComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  touch(): void {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsTouched({
        onlySelf: true,
      });
    });

    this.form.markAsTouched({
      onlySelf: true,
    });
  }

  get valid(): boolean {
    return this.form.valid;
  }
}
