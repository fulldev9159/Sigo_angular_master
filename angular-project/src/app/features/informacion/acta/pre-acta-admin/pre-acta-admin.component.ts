import { Component, OnInit } from '@angular/core';
import { DetalleActaServicio, DetalleActaUob } from '@data';
import { OtFacade } from '@storeOT/index';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-pre-acta-admin',
  templateUrl: './pre-acta-admin.component.html',
  styleUrls: ['./pre-acta-admin.component.scss'],
})
export class PreActaAdminComponent implements OnInit {
  subscription: Subscription = new Subscription();

  detalleActa$: Observable<{
    ultimo_tipo_pago: string;
    servicios: DetalleActaServicio[];
    unidades_obra: DetalleActaUob[];
  }> = this.otFacade.getDetalleActa$();
  ot$: Observable<any> = this.otFacade.getDetalleOT$();
  saving$: Observable<boolean> = this.otFacade.sendingGeneracionActa$();
  totalServicios: number;
  totalUO: number;
  totalServicios_servicio: number;
  totalUO_servicio: number;
  constructor(private otFacade: OtFacade) {}

  ngOnInit(): void {}
}
