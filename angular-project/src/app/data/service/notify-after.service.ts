import { Injectable } from '@angular/core';
import { SnackBarService } from '@utilsSIGO/snack-bar';
import * as cubActions from '@storeOT/features/cubicacion/cubicacion.actions';
import * as otActions from '@storeOT/features/ot/ot.actions';

import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import { Router } from '@angular/router';

interface Message {
  [i: string]: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotifyAfter {
  constructor(
    private cubageFacade: CubicacionFacade,
    private otFacade: OtFacade,
    private snackService: SnackBarService,
    private router: Router
  ) {}

  // StatusOK es el estado 'Ok'
  // StatusOK = 0

  // StatusEmpty es el estado cuando no hay items (zero rows)
  // StatusEmpty = 1

  // StatusError es el estado de error generico
  // StatusError = 2

  // StatusUnmarshalRequestFailed es el estado cuando no se puede hacer unmarshal del body del request
  // StatusUnmarshalRequestFailed = 3

  // StatusNoRowsAffected es el estado cuando no hay filas afectadas en un update
  // StatusNoRowsAffected = 4

  // StatusPermissionNotFound es el estado por falta de permisos
  // StatusPermissionNotFound = 5

  actions200(status: any, action: string, data?: any): void {
    // const msg: Message = {};
    // if (+status.responseCode === 0) {
    //   // OK
    //   if (
    //     action === cubActions.createCubSuccess.type ||
    //     action === cubActions.editCubicacionSuccess.type
    //   ) {
    //     this.cubageFacade.getCubicacionAction();
    //     this.router.navigate(['app/cubicacion/list-cub']);
    //   }
    //   if (
    //     action === otActions.saveInformeAvanceTrabajadorSuccess.type ||
    //     action === otActions.saveInformeAvanceAdminECSuccess.type ||
    //     action === otActions.sendSolicitudPagoActaSuccess.type
    //   ) {
    //     location.reload();
    //     // this.otFacade.getDataInformeAvanceTrabajador(+data.ot_id);
    //   }
    //   if (action === otActions.saveBorradorInformeAvanceSuccess.type) {
    //     this.otFacade.getDataInformeAvanceTrabajador(+data.ot_id);
    //   }
    //   if (msg[action] !== undefined) {
    //     this.snackService.showMessage(`${msg[action]}`, 'OK', 3000);
    //   }
    // } else {
    //   // Sin resultados
    //   // msg[otActions.getOtEjecucionSuccess.type] = 'No existen Ots en ejecución';
    //   // msg[otActions.getOtAbiertasSuccess.type] = 'No existen Ots abiertas';
    //   // msg[otActions.getOtSuccessCerradas.type] = 'No existen Ots cerradas';
    //   if (msg[action] !== undefined) {
    //     this.snackService.showMessage(
    //       `${msg[action]}- ${status.description}`,
    //       'info',
    //       2000
    //     );
    //   }
    // }
  }

  actionsErrors(message: string, action: string): void {
    const msg: Message = {};

    this.snackService.showMessage(`${msg[action]} - ${message}`, 'error', 4000);
  }
}
