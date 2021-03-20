import { Component, OnInit } from '@angular/core';
import * as OTModel from '@coreOT/models/ot.model';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'ot-ot',
  templateUrl: './ot.component.html',
  styleUrls: ['./ot.component.scss'],
  providers: [ConfirmationService],
})
export class OtComponent implements OnInit {
  ots: OTModel.TableOT[] = [
    {
      nombre_ot: 'OT1',
      fecha_inicio: new Date('2015-03-25'),
      fecha_fin: new Date('2015-03-26'),
      fecha_creacion: new Date('2015-03-25'),
      contrato: 'SBE',
      proveedor: 'ERICSSON CHILE S.A.',
      gestor: localStorage.getItem('nombreCompleto') as string,
      tipo_ot: 'OT',
    },
    {
      nombre_ot: 'OT2',
      fecha_inicio: new Date('2015-03-25'),
      fecha_fin: new Date('2015-03-26'),
      fecha_creacion: new Date('2015-03-25'),
      contrato: 'SBE',
      proveedor: 'NOKIA SOLUTIONS AND NETWORKS CHILE LTDA',
      gestor: localStorage.getItem('nombreCompleto') as string,
      tipo_ot: 'OT',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
