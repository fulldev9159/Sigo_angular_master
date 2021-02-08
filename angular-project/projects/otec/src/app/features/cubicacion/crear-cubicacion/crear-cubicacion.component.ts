import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'otec-crear-cubicacion',
  templateUrl: './crear-cubicacion.component.html',
  styleUrls: ['./crear-cubicacion.component.css'],
})
export class CrearCubicacionComponent implements OnInit {
  public contrato_id: string = '';
  public proveedor_id: string = '';
  public region_id: string = '';
  public tipo_servicio_id: string = '';

  constructor() {}

  ngOnInit(): void {}

  selectedContrato() {
    console.log(this.contrato_id);
  }
}
