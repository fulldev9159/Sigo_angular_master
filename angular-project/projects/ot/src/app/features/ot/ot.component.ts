import { Component, OnInit } from '@angular/core';
import * as OTModel from '@coreOT/models/ot.model';
import { ConfirmationService } from 'primeng/api';
import { OtService } from '@coreOT/services/ot.service';
import { SharedService } from '@coreOT/services/shared.service';
@Component({
  selector: 'ot-ot',
  templateUrl: './ot.component.html',
  styleUrls: ['./ot.component.scss'],
  providers: [ConfirmationService],
})
export class OtComponent implements OnInit {
  ots: OTModel.DataOT[] = [];
  rol = localStorage.getItem('rol');
  showAceptacion = true;
  constructor(
    private otService: OtService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    let colum = '';
    if ((localStorage.getItem('rol') as string) === 'Gestor') {
      colum = 'gestor_id';
    } else {
      colum = 'administrador_contrato_id';
    }
    this.otService
      .getOT(
        localStorage.getItem('username') as string,
        localStorage.getItem('otec_token') as string,
        colum
      )
      .subscribe((response) => {
        console.log(response);
        this.ots = response.data.OTs;
      });
  }

  Aceptacion(SesionSce: string, message: string): void {
    this.otService
      .setAceptacion(
        localStorage.getItem('username') as string,
        localStorage.getItem('otec_token') as string,
        SesionSce,
        message
      )
      .subscribe((x) => {
        const mensaje =
          message === 'OTAceptadaAdminEC'
            ? 'OT aceptada correctamente'
            : 'OT rechazada correctamente';
        this.sharedService.showMessage(mensaje, 'ok');
        this.showAceptacion = false;
        console.log(x);
      });
  }
}
