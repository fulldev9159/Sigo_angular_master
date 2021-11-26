import { Injectable } from '@angular/core';
import { SnackBarService } from '@utilsSIGO/snack-bar';
import * as cubActions from '@storeOT/features/cubicacion/cubicacion.actions';
import * as otActions from '@storeOT/features/ot/ot.actions';

import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import { Router } from '@angular/router';
import { StatusResponse } from '@data';

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

  actions200(status: StatusResponse, action: string, data?: any): void {
    const msg: Message = {};

    if (+status.responseCode === 0) {
      // OK
      msg[cubActions.createCubSuccess.type] = 'Cubicación creada exitosamente';
      msg[cubActions.editCubicacionSuccess.type] =
        'Cubicación actualizada exitosamente';
      msg[cubActions.deleteCubicacionSuccess.type] =
        'Cubicación eliminada exitosamente';
      msg[otActions.saveBorradorInformeAvanceSuccess.type] =
        'Borrador guardado con éxito';
      msg[otActions.saveInformeAvanceTrabajadorSuccess.type] =
        'Informe enviado con éxito';
      msg[otActions.saveInformeAvanceAdminECSuccess.type] =
        'Informe enviado con éxito';
      msg[otActions.rechazarInformeAvanceSuccess.type] =
        'Informe rechazado con éxito';
      msg[otActions.saveInformeActaSuccess.type] =
        'El acta fue enviada correctamente';
      msg[otActions.rechazarInformeActaSuccess.type] =
        'El acta fue rechazada correctamente';
      msg[otActions.sendSolicitudPagoActaSuccess.type] =
        'La solicitud de pago a sido enviada';

      if (
        action === cubActions.createCubSuccess.type ||
        action === cubActions.editCubicacionSuccess.type
      ) {
        this.cubageFacade.getCubicacionAction();
        this.router.navigate(['app/cubicacion/list-cub']);
      }

      if (
        action === otActions.saveInformeAvanceTrabajadorSuccess.type ||
        action === otActions.saveInformeAvanceAdminECSuccess.type ||
        action === otActions.sendSolicitudPagoActaSuccess.type
      ) {
        location.reload();
        // this.otFacade.getDataInformeAvanceTrabajador(+data.ot_id);
      }

      if (action === otActions.saveBorradorInformeAvanceSuccess.type) {
        this.otFacade.getDataInformeAvanceTrabajador(+data.ot_id);
      }

      if (msg[action] !== undefined) {
        this.snackService.showMessage(`${msg[action]}`, 'OK', 3000);
      }
    } else {
      // Sin resultados
      // msg[otActions.getOtEjecucionSuccess.type] = 'No existen Ots en ejecución';
      // msg[otActions.getOtAbiertasSuccess.type] = 'No existen Ots abiertas';
      // msg[otActions.getOtSuccessCerradas.type] = 'No existen Ots cerradas';
      msg[cubActions.getCubsSuccess.type] = 'No existen cubicaciones';
      msg[cubActions.getContractMarcoSuccess.type] =
        'Usuario no tiene contratos asosiados';
      msg[cubActions.getProveedores4CubSuccess.type] =
        'No existen proveedores para el contrato seleccionado';
      msg[cubActions.getSubContractedRegionsSuccess.type] =
        'No existen regiones para el proveedor seleccionado';
      msg[cubActions.getSubContractedServicesSuccess.type] =
        'No existen LPUs para el tipo seleccionado';
      msg[cubActions.createCubSuccess.type] = 'No se pudo crear la cubicación';
      // msg[cubActions.getAutoSuggestSuccess.type] =
      //   'No existen sugerencias de nombre';
      msg[cubActions.getDetalleCubicacionSuccess.type] =
        'No posee detalle de cubicación';
      msg[otActions.getDataInformeAvanceTrabajadorSuccess.type] =
        'No posee información de informe de avance';
      msg[otActions.getDataInformeAvanceAdminECSuccess.type] =
        'No posee información de informe de avance';
      msg[otActions.getDataInformeActaSuccess.type] =
        'El acta no posee información';
      msg[otActions.getPlansSuccess.type] = 'No existen planes de proyectos';
      msg[otActions.getSiteSuccess.type] =
        'No existen sitios para el proyecto escogido';
      msg[otActions.getPmoSuccess.type] = 'No existen pmos';
      msg[otActions.getDetalleActaSuccess.type] =
        'No existen valores para el acta';
      if (msg[action] !== undefined) {
        this.snackService.showMessage(
          `${msg[action]}- ${status.description}`,
          'info',
          2000
        );
      }
    }
  }

  actionsErrors(message: string, action: string): void {
    const msg: Message = {};

    msg[cubActions.getCubsError.type] = 'Error al obtener cubicaciones';
    msg[cubActions.getSingleCubicacionError.type] =
      'No se pudo obtener datos de la cubicación';
    msg[cubActions.getContractMarcoError.type] =
      'Error al obtener contratos para cubicar';
    msg[cubActions.getSubContractProvidersError.type] =
      'Error al obtener proveedores para cubicar';
    msg[cubActions.getSubContractedRegionsError.type] =
      'Error al obtener regiones para cubicar';
    msg[cubActions.getSubContractedTypeServicesError.type] =
      'Error al obtener Tipo Servicios para cubicar';
    msg[cubActions.createCubError.type] = 'No se pudo crear la cubicación';
    msg[cubActions.getSubContractedServicesError.type] =
      'Error al obtener LPUS para cubicar';
    msg[cubActions.editCubicacionError.type] =
      'No se pudo editar la cubicación';
    msg[cubActions.getAutoSuggestError.type] =
      'No se pudo obtener sugerencias de nombre de cubicación';
    msg[cubActions.getDetalleCubicacionError.type] =
      'No se pudo obtener obtener el detalle de la cubicación';
    msg[cubActions.deleteCubicacionError.type] =
      'No se pudo eliminar la cubicación';
    msg[otActions.saveBorradorInformeAvanceError.type] =
      'No se pudo guardar borrador';
    msg[otActions.saveInformeAvanceError.type] =
      'No se pudo enviar informe de avance';
    msg[otActions.getDataInformeAvanceError.type] =
      'No se pudo obtener datos del informe de avance';
    msg[otActions.rechazarInformeAvanceError.type] =
      'Falló la ejecución del rechazo';
    msg[otActions.getDataInformeActaError.type] =
      'No se pudo obtener la información del acta';
    msg[otActions.saveInformeActaError.type] = 'No se pudo enviar el acta';
    msg[otActions.rechazarInformeActaError.type] =
      'Falló la ejecución del rechazo';
    // msg[otActions.inicializarInformeAvanceError.type] =
    //   'Falló la inicialización del informe';
    msg[otActions.getPlansError.type] = 'No se pudo obtener los planes';
    msg[otActions.getOtsError.type] = 'Falló la obtención de OTs';
    msg[otActions.getSiteError.type] = 'Falló la obtención de Sitios';
    msg[otActions.getPmoError.type] = 'Falló la obtención de PMOs';
    msg[otActions.getDetalleActaError.type] =
      'Falló la obtención de información del acta';

    this.snackService.showMessage(`${msg[action]} - ${message}`, 'error', 4000);
  }
}
