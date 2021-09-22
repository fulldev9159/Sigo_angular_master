import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contrato-movil-lpus-table',
  templateUrl: './contrato-movil-lpus-table.component.html',
  styleUrls: ['./contrato-movil-lpus-table.component.scss'],
})
export class ContratoMovilLpusTableComponent implements OnInit {
  items = [
    {
      cantidad: 1,
      lpu_id: 30265,
      lpu_nombre: '"DESINST bastidores de 19"" o 24"""',
      lpu_numero_producto: '',
      lpu_precio: 70349,
      lpu_subtotal: 70349,
      lpu_unidad_codigo: 3,
      lpu_unidad_nombre: 'UNIDAD',
      region: 'XIII',
      tipo_moneda_cod: 'CLP',
      tipo_moneda_id: 2,
      tipo_servicio: 'PROYECTO (FIJA)',
    },
    {
      cantidad: 1,
      lpu_id: 832,
      lpu_nombre: '"DESINST bastidores de 19"" o 24"""',
      lpu_numero_producto: '',
      lpu_precio: 68942,
      lpu_subtotal: 68942,
      lpu_unidad_codigo: 3,
      lpu_unidad_nombre: 'UNIDAD',
      region: 'XIII',
      tipo_moneda_cod: 'CLP',
      tipo_moneda_id: 2,
      tipo_servicio: 'PROYECTO (FIJA)',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
