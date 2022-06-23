import { Component, OnInit, Input } from '@angular/core';
import { DetalleInformeAvance } from '@data';

@Component({
  selector: 'app-detalle-informe-avance-table',
  templateUrl: './detalle-informe-avance-table.component.html',
  styleUrls: ['./detalle-informe-avance-table.component.scss'],
})
export class DetalleInformeAvanceTableComponent implements OnInit {
  @Input() error: any;
  @Input() detalle: DetalleInformeAvance;

  constructor() {}

  ngOnInit(): void {}
}
