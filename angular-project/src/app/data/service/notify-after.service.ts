import { Injectable } from '@angular/core';
import { SnackBarService } from '@utilsSIGO/snack-bar';
import * as cubActions from '@storeOT/features/cubicacion/cubicacion.actions';
import * as otActions from '@storeOT/features/ot/ot.actions';

import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
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

  messageOk(action: string): string {
    const msg: Message = {};
    msg[cubActions.createCubSuccess.type] = 'Cubicación creada exitosamente';
    msg[cubActions.editCubicacionSuccess.type] =
      'Cubicación actualizada exitosamente';
    msg[cubActions.deleteCubicacionSuccess.type] =
      'Cubicación eliminada exitosamente';
    msg[otActions.saveBorradorInformeAvanceSuccess.type] =
      'Borrador guardado con exito';

    return msg[action];
  }

  messageInfoSinResultado(action: string): string {
    const msg: Message = {};
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
    // msg[cubActions.editCubicacionSuccess.type] =
    //   'No se pudo editar la cubicación';
    msg[cubActions.getAutoSuggestError.type] =
      'No existen sugerencias de nombre';
    msg[cubActions.getDetalleCubicacionError.type] =
      'No posee detalle de cubicación';
    msg[otActions.getDataInformeAvanceError.type] =
      'No posee información de informe de avance';

    return msg[action];
  }

  messageError(action: string): string {
    const msg: Message = {};
    msg[cubActions.getCubsError.type] = 'Error al obtener cubicaciones';
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

    return msg[action];
  }
}
