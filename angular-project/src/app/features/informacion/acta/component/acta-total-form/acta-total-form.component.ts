import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-acta-total-form',
  templateUrl: './acta-total-form.component.html',
  styleUrls: ['./acta-total-form.component.scss'],
})
export class ActaTotalFormComponent implements OnInit, OnDestroy {
  @Input() servicios: FormArray;
  @Input() unidadesObra: FormArray;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
