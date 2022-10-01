import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CarritoService } from '@model';
import { FormAgregarServiciosComponent } from '@sharedOT/form-agregar-servicios/form-agregar-servicios.component';
import { FormTableServicesComponent } from '@sharedOT/form-table-services/form-table-services.component';
// 94 TODO: DETERMINAR SI ESTE COMPONENTE ES NECESARIO O SE PUEDE USAR LOS COMPOENTENES AGREGAR Y TABLA POR SEPARADO
@Component({
  selector: 'zwc-table-agregar-servicios',
  templateUrl: './table-agregar-servicios.component.html',
  styleUrls: ['./table-agregar-servicios.component.scss'],
})
export class TableAgregarServiciosComponent {
  @Input() reglasDeAgregacion: string;
  @Input() informeAvance: CarritoService[] = [];

  @ViewChild('agregarServiciosForm', {
    read: FormAgregarServiciosComponent,
    static: false,
  })
  agregarServiciosForm: FormAgregarServiciosComponent;

  @ViewChild('tableServicios', {
    read: FormTableServicesComponent,
    static: false,
  })
  tableServicios: FormTableServicesComponent;

  constructor() {}
}
