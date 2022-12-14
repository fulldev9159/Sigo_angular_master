import { Component, Input } from '@angular/core';
import { DetalleProyectoTablaDebitado } from '@model';

@Component({
  selector: 'zwc-table-detalle-proyecto-table-debitado',
  templateUrl: './table-detalle-proyecto-table-debitado.component.html',
  styleUrls: ['./table-detalle-proyecto-table-debitado.component.scss'],
})
export class TableDetalleProyectoTableDebitadoComponent {
  @Input() detalle: DetalleProyectoTablaDebitado[] = [];

  constructor() {}
}
