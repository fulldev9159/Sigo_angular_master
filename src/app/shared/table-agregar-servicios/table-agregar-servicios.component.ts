import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormAgregarServiciosComponent } from '@sharedOT/form-agregar-servicios/form-agregar-servicios.component';
import { FormTableServicesComponent } from '@sharedOT/form-table-services/form-table-services.component';

@Component({
  selector: 'zwc-table-agregar-servicios',
  templateUrl: './table-agregar-servicios.component.html',
  styleUrls: ['./table-agregar-servicios.component.scss'],
})
export class TableAgregarServiciosComponent {
  @Input() reglasDeAgregacion: string;

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
