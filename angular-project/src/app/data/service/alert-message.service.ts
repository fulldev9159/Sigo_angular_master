import { Injectable } from '@angular/core';
import { SnackBarService } from '@utilsSIGO/snack-bar';
import * as ca from '@storeOT/features/cubicacion/cubicacion.actions';
import * as otActions from '@storeOT/features/ot/ot.actions';
import * as authActions from '@storeOT/features/auth/auth.actions';
import * as areaActions from '@storeOT/features/area/area.actions';
import * as contratoActions from '@storeOT/features/contratos/contratos.actions';
import * as userActions from '@storeOT/features/user/user.actions';
import * as profileActions from '@storeOT/features/profile/profile.actions';
import * as cubActions from '@storeOT/features/cubicacion/cubicacion.actions';

import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { ContratoFacade } from '@storeOT/features/contratos/contratos.facade';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import { UserFacade } from '@storeOT/features/user/user.facade';

import { Router } from '@angular/router';
import { MessageNotifyEffect } from '@data';
import { NgxPermissionsService } from 'ngx-permissions';
import { tap } from 'lodash';
import { map } from 'rxjs/operators';

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
    private router: Router,
    private permissionsService: NgxPermissionsService
  ) {
    // Status OK
    this.msgOK[ca.createCubSuccess.type] = 'Cubicación creada exitosamente';

    // errores de negocio
    this.msgNegocio[authActions.loginSuccess.type] =
      'Usuario/Password incorrecto';
    this.msgNegocio[ca.getProveedores4CubSuccess.type] =
      'No existen proveedores para el contrato seleccionado';
    this.msgNegocio[ca.createCubSuccess.type] =
      'No se pudo crear la cubicación';
    this.msgNegocio[otActions.getPMOSuccess.type] = 'No existen pmos';
    this.msgNegocio[otActions.updateDetalleInformeAvanceSuccess.type] =
      'Borrador actualizado';
    this.msgNegocio[otActions.sendDetalleInformeAvanceSuccess.type] =
      'Informe enviado';

    // Statur ERROR
    this.msgErr[otActions.getPmoError.type] = 'Falló la obtención de PMOs';
    this.msgErr[otActions.updateDetalleInformeAvanceError.type] =
      'Fallo la actualización del borrador';
  }

  messageActions(
    code: number,
    message: string,
    action: string,
    data?: any
  ): void {
    if (code === 0) {
      // if (action === userActions.getAllAreas4CreateUserSuccess.type) {
      //   this.snackService.showMessage(`Test Message`, 'OK', 3000);
      // }
      if (
        action === areaActions.updateAreaSuccess.type ||
        action === contratoActions.updateContratoSuccess.type ||
        action === userActions.editarSuperiorPerfilUsuarioSuccess.type ||
        action === userActions.updateUserSuccess.type ||
        action === profileActions.updatePerfilSuccess.type ||
        action === ca.editCubSuccess.type ||
        action === otActions.updateDetalleInformeAvanceSuccess.type ||
        action === otActions.sendDetalleInformeAvanceSuccess.type
      ) {
        this.snackService.showMessage(`Actualización exitosa`, 'OK', 3000);
      } else if (
        action === contratoActions.activateContratoSuccess.type ||
        action === userActions.agregarPerfilUsuarioSuccess.type ||
        action === userActions.addFirmaUserSuccess.type ||
        action === profileActions.eliminarPerfilSuccess.type ||
        action === ca.deleteCubSuccess.type ||
        action === ca.deleteDetalleCubSuccess.type ||
        action === otActions.AceptarRechazarIncialOTSuccess.type ||
        action === otActions.AsignarSupervisorTrabajosOTSuccess.type ||
        action === otActions.createRegistroLibroObrasSuccess.type ||
        action === otActions.sendGeneracionActaSuccess.type ||
        action === otActions.AceptarRechazarInformeAvanceOTSuccess.type ||
        action === otActions.solicitarPagoSuccess.type ||
        action === otActions.cerrarOTSuccess.type ||
        action === otActions.anularOTSuccess.type ||
        action === otActions.solicitarInformeTrabajosFinalizadosSuccess.type ||
        action === otActions.informarTrabajosFinalizadosSuccess.type
      ) {
        this.snackService.showMessage(`Accion realizada con éxito`, 'OK', 3000);
      } else if (
        action === userActions.createUserSuccess.type ||
        action === profileActions.createPerfilSuccess.type ||
        action === ca.createCubSuccess.type
      ) {
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
        this.authFacade.getLogin$().subscribe(loginAuth => {
          console.log(loginAuth);
          if (loginAuth && loginAuth.permisos) {
            this.permissionsService.loadPermissions(loginAuth.permisos);
          }
        });

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

      if (action === ca.deleteCubSuccess.type) {
        this.cubageFacade.AllCubs();
      }

      if (
        action === userActions.createUserSuccess.type ||
        action === userActions.updateUserSuccess.type
      ) {
        this.router.navigate(['/app/user/list-user']);
      }

      if (
        action === profileActions.createPerfilSuccess.type ||
        action === profileActions.updatePerfilSuccess.type
      ) {
        this.router.navigate(['/app/profile/list-pro']);
      }

      if (
        action === ca.createCubSuccess.type ||
        action === ca.editCubSuccess.type
      ) {
        this.router.navigate(['/app/cubicacion/list-cub']);
        this.cubageFacade.AllCubs();
      }

      if (
        action === otActions.createOTSuccess.type ||
        action === otActions.AprobarRechazarActaOTSuccess.type ||
        action === otActions.AprobarRechazarSolicitudPagoSuccess.type ||
        action === cubActions.agregarServiciosAdicionalesSuccess.type
      ) {
        this.router.navigate(['/app/ot/list-ot']);
      }

      if (
        action === ca.clonCubSuccess.type ||
        action === otActions.sendGeneracionActaSuccess.type ||
        action === authActions.loginSuccess.type
      ) {
        location.reload();
      }

      if (
        action === otActions.AceptarRechazarIncialOTSuccess.type ||
        action === otActions.sendDetalleInformeAvanceSuccess.type ||
        action === otActions.AceptarRechazarInformeAvanceOTSuccess.type ||
        action === otActions.AsignarSupervisorTrabajosOTSuccess.type ||
        action === otActions.AceptarRechazarInformeAvanceOTSuccess.type ||
        action === otActions.solicitarPagoSuccess.type ||
        action === otActions.cerrarOTSuccess.type ||
        action === otActions.anularOTSuccess.type ||
        action === otActions.AprobarRechazarOperacionesSuccess.type ||
        action === otActions.confirmarRechazoObrasSuccess.type ||
        action === otActions.solicitarInformeTrabajosFinalizadosSuccess.type ||
        action === otActions.informarTrabajosFinalizadosSuccess.type
      ) {
        this.otFacade.getOts({
          filtro_propietario: 'TODAS',
          filtro_tipo: 0,
          filtro_pestania: '',
        });
      }
    }
  }
}
