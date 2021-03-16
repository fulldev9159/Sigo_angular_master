import { Component, OnInit, Input } from '@angular/core';
import { CubicacionService } from '@coreOT/services/cubicacion.service';
import { SharedService } from '@coreOT/services/shared.service';
import * as CubicacionModel from '@coreOT/models/cubicacion.model';

@Component({
  selector: 'ot-detalle-cubicacion',
  templateUrl: './detalle-cubicacion.component.html',
  styleUrls: ['../crear-cubicacion/crear-cubicacion.component.scss'],
})
export class DetalleCubicacionComponent implements OnInit {
  @Input()
  cubicacionSelected: CubicacionModel.Cubicacion = {} as CubicacionModel.Cubicacion;
  @Input() detallesCubicacionSelected: CubicacionModel.DetalleCubicacion[] = [];

  constructor() {}

  ngOnInit(): void {}
}
