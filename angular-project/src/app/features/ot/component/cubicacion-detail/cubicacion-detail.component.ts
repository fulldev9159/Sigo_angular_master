import { Component, OnInit, Input } from '@angular/core';
import { Cubicacion } from '@storeOT/features/cubicacion/cubicacion.model';

@Component({
  selector: 'app-cubicacion-detail',
  templateUrl: './cubicacion-detail.component.html',
  styleUrls: ['./cubicacion-detail.component.scss'],
})
export class CubicacionDetailComponent implements OnInit {
  @Input() cubicacion: Cubicacion;

  constructor() {}

  ngOnInit(): void {}
}
