import { Injectable } from '@angular/core';
import { SnackBarService } from '@utilsSIGO/snack-bar';
import * as ca from '@storeOT/features/cubicacion/cubicacion.actions';
import * as otActions from '@storeOT/features/ot/ot.actions';
import * as authActions from '@storeOT/features/auth/auth.actions';
import * as areaActions from '@storeOT/features/area/area.actions';
import * as contratoActions from '@storeOT/features/contratos/contratos.actions';
import * as userActions from '@storeOT/features/user/user.actions';

import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { ContratoFacade } from '@storeOT/features/contratos/contratos.facade';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import { UserFacade } from '@storeOT/features/user/user.facade';

import { Router } from '@angular/router';
import { MessageNotifyEffect } from '@data';

@Injectable({
  providedIn: 'root',
})
export class AlertMessageActions {
  msgOK: MessageNotifyEffect = {};
  msgNegocio: MessageNotifyEffect = {};
  msgErr: MessageNotifyEffect = {};

  constructor(
    private cubageFacade: CubicacionFacade,
    private otFacade: OtFacade,
    private authFacade: AuthFacade,
    private userFacade: UserFacade,
    private contratoFacade: ContratoFacade,
    private snackService: SnackBarService,
    private router: Router
  ) {
    // Status OK
    // this.msgOK[authActions.loginSuccess.type] = 'Login exitoso';
    this.msgOK[ca.createCubSuccess.type] = 'Cubicación creada exitosamente';
    // this.msgOK[areaActions.updateAreaSuccess.type] =
    //   'Se ha actualizado correctamente';
    this.msgOK[ca.editCubicacionSuccess.type] =
      'Cubicación actualizada exitosamente';
    this.msgOK[ca.deleteCubicacionSuccess.type] =
      'Cubicación eliminada exitosamente';
    this.msgOK[otActions.saveBorradorInformeAvanceSuccess.type] =
      'Borrador guardado con éxito';
    this.msgOK[otActions.saveInformeAvanceTrabajadorSuccess.type] =
      'Informe enviado con éxito';
    this.msgOK[otActions.saveInformeAvanceAdminECSuccess.type] =
      'Informe enviado con éxito';
    this.msgOK[otActions.rechazarInformeAvanceSuccess.type] =
      'Informe rechazado con éxito';
    this.msgOK[otActions.saveInformeActaSuccess.type] =
      'El acta fue enviada correctamente';
    this.msgOK[otActions.rechazarInformeActaSuccess.type] =
      'El acta fue rechazada correctamente';
    this.msgOK[otActions.sendSolicitudPagoActaSuccess.type] =
      'La solicitud de pago a sido enviada';

    // errores de negocio
    this.msgNegocio[authActions.loginSuccess.type] =
      'Usuario/Password incorrecto';
    this.msgNegocio[ca.getCubsSuccess.type] = 'No existen cubicaciones';
    this.msgNegocio[ca.getContractMarcoSuccess.type] =
      'Usuario no tiene contratos asosiados';
    this.msgNegocio[ca.getProveedores4CubSuccess.type] =
      'No existen proveedores para el contrato seleccionado';
    this.msgNegocio[ca.getSubContractedRegionsSuccess.type] =
      'No existen regiones para el proveedor seleccionado';
    this.msgNegocio[ca.getSubContractedServicesSuccess.type] =
      'No existen LPUs para el tipo seleccionado';
    this.msgNegocio[ca.createCubSuccess.type] =
      'No se pudo crear la cubicación';
    // msg[cubActions.getAutoSuggestSuccess.type] =
    //   'No existen sugerencias de nombre';
    this.msgNegocio[ca.getDetalleCubicacionSuccess.type] =
      'No posee detalle de cubicación';
    this.msgNegocio[otActions.getDataInformeAvanceTrabajadorSuccess.type] =
      'No posee información de informe de avance';
    this.msgNegocio[otActions.getDataInformeAvanceAdminECSuccess.type] =
      'No posee información de informe de avance';
    this.msgNegocio[otActions.getDataInformeActaSuccess.type] =
      'El acta no posee información';
    this.msgNegocio[otActions.getPlansSuccess.type] =
      'No existen planes de proyectos';
    this.msgNegocio[otActions.getSiteSuccess.type] =
      'No existen sitios para el proyecto escogido';
    this.msgNegocio[otActions.getPmoSuccess.type] = 'No existen pmos';
    this.msgNegocio[otActions.getDetalleActaSuccess.type] =
      'No existen valores para el acta';

    // Statur ERROR
    this.msgErr[ca.getCubsError.type] = 'Error al obtener cubicaciones';
    this.msgErr[ca.getSingleCubicacionError.type] =
      'No se pudo obtener datos de la cubicación';
    this.msgErr[ca.getContractMarcoError.type] =
      'Error al obtener contratos para cubicar';
    this.msgErr[ca.getSubContractProvidersError.type] =
      'Error al obtener proveedores para cubicar';
    this.msgErr[ca.getSubContractedRegionsError.type] =
      'Error al obtener regiones para cubicar';
    this.msgErr[ca.getSubContractedTypeServicesError.type] =
      'Error al obtener Tipo Servicios para cubicar';
    this.msgErr[ca.createCubError.type] = 'No se pudo crear la cubicación';
    this.msgErr[ca.getSubContractedServicesError.type] =
      'Error al obtener LPUS para cubicar';
    this.msgErr[ca.editCubicacionError.type] =
      'No se pudo editar la cubicación';
    this.msgErr[ca.getAutoSuggestError.type] =
      'No se pudo obtener sugerencias de nombre de cubicación';
    this.msgErr[ca.getDetalleCubicacionError.type] =
      'No se pudo obtener obtener el detalle de la cubicación';
    this.msgErr[ca.deleteCubicacionError.type] =
      'No se pudo eliminar la cubicación';
    this.msgErr[otActions.saveBorradorInformeAvanceError.type] =
      'No se pudo guardar borrador';
    this.msgErr[otActions.saveInformeAvanceError.type] =
      'No se pudo enviar informe de avance';
    this.msgErr[otActions.getDataInformeAvanceError.type] =
      'No se pudo obtener datos del informe de avance';
    this.msgErr[otActions.rechazarInformeAvanceError.type] =
      'Falló la ejecución del rechazo';
    this.msgErr[otActions.getDataInformeActaError.type] =
      'No se pudo obtener la información del acta';
    this.msgErr[otActions.saveInformeActaError.type] =
      'No se pudo enviar el acta';
    this.msgErr[otActions.rechazarInformeActaError.type] =
      'Falló la ejecución del rechazo';
    // msg[otActions.inicializarInformeAvanceError.type] =
    //   'Falló la inicialización del informe';
    this.msgErr[otActions.getPlansError.type] = 'No se pudo obtener los planes';
    this.msgErr[otActions.getOtsError.type] = 'Falló la obtención de OTs';
    this.msgErr[otActions.getSiteError.type] = 'Falló la obtención de Sitios';
    this.msgErr[otActions.getPmoError.type] = 'Falló la obtención de PMOs';
    this.msgErr[otActions.getDetalleActaError.type] =
      'Falló la obtención de información del acta';
  }

  messageActions(
    code: number,
    message: string,
    action: string,
    data?: any
  ): void {
    if (code === 0) {
      if (action === userActions.getAllAreas4CreateUserSuccess.type) {
        this.snackService.showMessage(`Test Message`, 'OK', 3000);
      }
      if (
        action === areaActions.updateAreaSuccess.type ||
        action === contratoActions.updateContratoSuccess.type ||
        action === userActions.editarSuperiorPerfilUsuarioSuccess.type ||
        action === userActions.updateUserSuccess.type
      ) {
        this.snackService.showMessage(`Actualización exitosa`, 'OK', 3000);
      } else if (
        action === contratoActions.activateContratoSuccess.type ||
        action === userActions.agregarPerfilUsuarioSuccess.type ||
        action === userActions.addFirmaUserSuccess.type
      ) {
        this.snackService.showMessage(`Accion realizada con éxito`, 'OK', 3000);
      } else if (action === userActions.createUserSuccess.type) {
        this.snackService.showMessage(`Creación exitosa`, 'OK', 3000);
      } else if (this.msgOK[action]) {
        this.snackService.showMessage(`${this.msgOK[action]}`, 'OK', 3000);
      }
    } else if (code === 2) {
      this.snackService.showMessage(
        `${this.msgNegocio[action]}- ${message}`,
        'info',
        2000
      );
    } else {
      this.snackService.showMessage(
        `${this.msgErr[action]}- ${message}`,
        'error',
        4000
      );
    }

    // ACTIONS
    if (code === 0) {
      if (action === authActions.setPerfilSelectedSuccess.type) {
        this.authFacade.refreshProxyID(
          data.proxy_id,
          data.nombre_perfil_select
        );
        this.authFacade.getPermisosPerfil();
      }

      if (action === authActions.getPerrmisoPerfilSuccess.type) {
        this.router.navigate(['app/dashboard']);
      }

      if (action === areaActions.updateAreaSuccess.type) {
        this.router.navigate(['app/area']);
      }

      if (action === contratoActions.updateContratoSuccess.type) {
        this.router.navigate(['app/contratos']);
      }
      if (action === contratoActions.activateContratoSuccess.type) {
        this.contratoFacade.getAllContratos();
      }

      if (
        action === userActions.createUserSuccess.type ||
        action === userActions.updateUserSuccess.type
      ) {
        this.router.navigate(['/app/user/list-user']);
      }
    }
  }
}
