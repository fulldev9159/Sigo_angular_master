import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SnackMessageService } from './snack-message.service';
import * as authActions from '@storeOT/auth/auth.actions';
import * as perfilActions from '@storeOT/perfil/perfil.actions';
import * as usuarioActions from '@storeOT/usuario/usuario.actions';
import * as cubicacionActions from '@storeOT/cubicacion/cubicacion.actions';
import * as otActions from '@storeOT/ot/ot.actions';
import * as flujoOTActions from '@storeOT/flujo-ot/flujo-ot.actions';
import * as serviciosActions from '@storeOT/servicios/servicios.actions';
import * as informeAvanceActions from '@storeOT/informe-avance/informe-avance.actions';
import * as actaActions from '@storeOT/acta/acta.actions';
import * as otDetalleActions from '@storeOT/ot-detalle/ot-detalle.actions';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { OTFacade } from '@storeOT/ot/ot.facades';
import { ServiciosFacade } from '@storeOT/servicios/servicios.facades';
import { InformeAvanceFacade } from '@storeOT/informe-avance/informe-avance.facades';
import * as ingenieriaActions from '@storeOT/ingenieria/ingenieria.actions';

interface ActionErr {
  error?: any;
  type: string;
}

interface ActionSuccess {
  response?: {
    data?: any;
    status: {
      code: number;
      desc: string;
    };
  };
  ot_id?: number;
  type: string;
}

// 103 TODO: VER MANERA DE IDENTIFICAR SI ES UNA AUTORIZACION O RECHAZO DE INFORME DE AVANCE

@Injectable({
  providedIn: 'root',
})
export class AfterHttpService {
  constructor(
    private router: Router,
    private snackMessage: SnackMessageService,
    private authFacade: AuthFacade,
    private cubicacionFacade: CubicacionFacade,
    private serviciosFacade: ServiciosFacade,
    private informeAvanceFacade: InformeAvanceFacade,
    private otFacade: OTFacade
  ) {}

  errorHandler(action: ActionErr): void {
    this.snackMessage.showMessage(
      action.error.error.status.desc,
      'error',
      7000
    );
  }

  successHandler(action: ActionSuccess): void {
    // LOGIN
    if (action.type === authActions.loginSuccess.type) {
      this.router.navigate(['/login/two-factor-authentication']);
    }
    // LOGIN
    if (action.type === authActions.login2FASuccess.type) {
      this.router.navigate(['/login/perfil-select']);
    }
    // LOGOUT
    if (action.type === authActions.Logout.type) {
      this.router.navigate(['/login/auth']);
    }
    // GET PERFILES USUARIO
    if (
      action.type === perfilActions.getPerfilesUsuarioSuccess.type &&
      action.response.status.code === 0 &&
      action.response.data.perfiles.length === 0
    ) {
      this.snackMessage.showMessage(
        'No tiene perfiles asignados, comuníquese con el administrador de sistema',
        'info',
        6000
      );
    }

    // REFRESH LOGIN
    if (action.type === authActions.refreshLoginSuccess.type) {
      this.authFacade.getPermisosPerfilUsuario4Login();
    }

    if (
      action.type === authActions.getPermisosPerfilUsuario4LoginSuccess.type
    ) {
      this.router.navigate(['/home']);
    }

    // GET CONTRATOS USUARIO
    if (
      action.type === usuarioActions.getContratosUsuarioSuccess.type &&
      action.response.status.code === 2 &&
      action.response.data.items.length === 0
    ) {
      this.snackMessage.showMessage(
        'No tiene contratos asignados. Favor contactar con el administrador del sistema',
        'info',
        6000
      );
    }

    // CREATE CUBICACIÓN
    if (action.type === cubicacionActions.createCubicacionSuccess.type) {
      this.snackMessage.showMessage(
        `Cubicación creada con exito. Cubicación ID:${action.response.data.cubicacion_id}`,
        'Exito',
        2000
      );
      this.router.navigate(['/cubicacion/list-cub']);
    }

    // EDITAR CUBICACIÓN
    if (action.type === cubicacionActions.editCubicacionSuccess.type) {
      this.snackMessage.showMessage(
        `Cubicación ID:${action.response.data.cubicacion_id} editada con exito`,
        'Exito',
        4000
      );
      this.router.navigate(['/cubicacion/list-cub']);
    }

    // EDITAR CUBICACIÓN
    if (action.type === cubicacionActions.editCubicacionSuccess.type) {
      this.snackMessage.showMessage(
        `Cubicación actualizada con éxito`,
        'Exito',
        4000
      );
      location.reload();
    }

    // CLONAR CUBICACIÓN
    if (action.type === cubicacionActions.clonarCubicacionSuccess.type) {
      this.snackMessage.showMessage(
        `Clonación realizada con éxito. Nueva Cubicación ID:${action.response.data.cubicacion_id}`,
        'Exito',
        2000
      );
      this.cubicacionFacade.listarCubicaciones();
    }

    // ELIMINAR CUBICACIÓN
    if (action.type === cubicacionActions.eliminarCubicacionSuccess.type) {
      this.snackMessage.showMessage(
        `Cubicación ID:${action.response.data.cubicacion_id} eliminada con exito`,
        'Exito',
        2000
      );
      this.cubicacionFacade.listarCubicaciones();
    }

    // ELIMINAR SERVICIO CARRITO
    if (action.type === cubicacionActions.eliminarServicioCarritoSuccess.type) {
      this.snackMessage.showMessage(`Eliminación exitosa`, 'Exito', 2000);
    }

    // CREATE OT
    if (action.type === otActions.createOTSuccess.type) {
      this.snackMessage.showMessage(
        `Orden de trabajo creada con exito. OT ID:${action.response.data.ot_id}`,
        'Exito',
        4000
      );
      this.router.navigate(['/ot/list-ot']);
    }

    // GUARDAR BORRADOR INFORME DE AVANCE
    if (
      action.type === serviciosActions.agregarAdicionalesSuccess.type ||
      action.type === informeAvanceActions.actualizarInformeAvanceSuccess.type
    ) {
      let ot_id = null;
      if (action.type === serviciosActions.agregarAdicionalesSuccess.type)
        ot_id = action.response.data.ot_id;
      if (
        action.type === informeAvanceActions.actualizarInformeAvanceSuccess.type
      )
        ot_id = action.ot_id;

      console.log('ot_id:', ot_id);
      if (ot_id === null) throw Error(`Falla after http ${action.type}`);
      else {
        this.snackMessage.showMessage(
          `Se guarda el informe de avance exitosamente`,
          'Exito',
          4000
        );

        this.serviciosFacade.resetCarritoServices();
        // this.informeAvanceFacade.getDetalleInformeAvance(+ot_id);
      }
      location.reload();
    }

    // ACEPTAR OT INICIAL
    if (action.type === flujoOTActions.aceptarRechazarIncialOTSuccess.type) {
      this.snackMessage.showMessage(`Acción exitosa`, 'Exito', 4000);
      this.reloadTableOT();
    }

    // ACEPTAR OT PROVEEDOR Y ASIGNAR SUPERVISOR
    if (action.type === flujoOTActions.asignarSupervisorTrabajoSuccess.type) {
      this.snackMessage.showMessage(`Asignación exitosa`, 'Exito', 4000);
      this.reloadTableOT();
    }

    // RECHAZAR OT PROVEEDOR
    if (action.type === flujoOTActions.rechazarOTProveedorSuccess.type) {
      this.snackMessage.showMessage(`Rechazo exitoso`, 'Exito', 4000);
      this.reloadTableOT();
    }

    // CONFIRMAR RECHAZO OPERACIONES
    if (action.type === flujoOTActions.confirmarRechazoObrasSuccess.type) {
      this.snackMessage.showMessage(`Confirmación exitosa`, 'Exito', 4000);
      this.reloadTableOT();
    }

    if (action.type === actaActions.aprobarRechazarSolicitudPagoSuccess.type) {
      this.snackMessage.showMessage(
        `Acción realizada exitosamente`,
        'Exito',
        4000
      );
      this.router.navigate(['/ot/list-ot']);
    }

    // ENVÍO DE INFORME DE AVANCE
    if (
      action.type === informeAvanceActions.sendDetalleInformeAvanceSuccess.type
    ) {
      this.snackMessage.showMessage(
        `Informe enviado exitosamente`,
        'Exito',
        4000
      );
      this.router.navigate(['/ot/list-ot']);
    }

    // CAMBIAR MATERIAL ORIGEN A PROVEEDOR
    if (
      action.type ===
      informeAvanceActions.CambiarMaterialOrigenAProveedorSuccess.type
    ) {
      this.snackMessage.showMessage(`Cambios realizados`, 'Exito', 4000);
    }

    if (
      action.type ===
      cubicacionActions.CambiarMaterialOrigenAProveedorSuccess.type
    ) {
      this.snackMessage.showMessage(`Cambios realizados`, 'Exito', 4000);
    }

    // ACEPTACION DE INFORME DE AVANCE
    if (
      action.type ===
      informeAvanceActions.AceptarRechazarInformeAvanceOTSuccess.type
    ) {
      this.snackMessage.showMessage(
        `Acción realizada exitosamente`,
        'Exito',
        4000
      );
      this.router.navigate(['/ot/list-ot']);
    }

    // GENERAR ACTA / INFORMAR TRABAJOS FINALIZADOS
    if (action.type === actaActions.informarTrabajosFinalizadosSuccess.type) {
      this.snackMessage.showMessage(
        `Acción realizada exitosamente`,
        'Exito',
        4000
      );
      this.router.navigate(['/ot/list-ot']);
    }

    // APROBAR/RECHAZAR ACTA Y VALIDAR ACTA
    if (action.type === actaActions.validarActaSuccess.type) {
      this.snackMessage.showMessage(
        `Acción realizada exitosamente`,
        'Exito',
        4000
      );
      this.router.navigate(['/ot/list-ot']);
    }

    // APROBAR RECHAZAR OPERACIONES
    if (action.type === flujoOTActions.aprobarRechazarOperacionesSuccess.type) {
      this.snackMessage.showMessage(
        `Acción realizada exitosamente`,
        'Exito',
        4000
      );
      this.router.navigate(['/ot/list-ot']);
    }

    // SOLICITAR PAGO
    if (action.type === flujoOTActions.solicitarPagoSuccess.type) {
      this.snackMessage.showMessage(
        `Envío de solicitud exitosa`,
        'Exito',
        4000
      );
      this.reloadTableOT();
    }

    // AGREGAR REGISTRO LIBRO OBRAS
    if (action.type === otDetalleActions.createRegistroLibroObrasSuccess.type) {
      this.snackMessage.showMessage(
        `Registro subido exitosamente`,
        'Exito',
        4000
      );
    }

    // CERRAR OT
    if (action.type === flujoOTActions.cerrarOTSuccess.type) {
      this.snackMessage.showMessage(`Cierre de OT exitoso`, 'Exito', 4000);
      this.reloadTableOT();
    }

    // ANULAR OT
    if (action.type === flujoOTActions.anularOTSuccess.type) {
      this.snackMessage.showMessage(
        `Anulación de la OT exitosa`,
        'Exito',
        4000
      );
      this.reloadTableOT();
    }

    // ELMINAR USUARIO
    if (action.type === usuarioActions.deleteUserSuccess.type) {
      this.snackMessage.showMessage(`Se ha eliminado con éxito`, 'Exito', 2000);
      location.reload();
    }

    // ACTIVAR USUARIO
    if (action.type === usuarioActions.activateUserSuccess.type) {
      this.snackMessage.showMessage(
        `Acción realizada con éxito`,
        'Exito',
        2000
      );
    }

    // SOLICITAR INFORME TRABAJOS FINALIZADOS
    if (
      action.type ===
      actaActions.solicitarInformeTrabajosFinalizadosSuccess.type
    ) {
      this.snackMessage.showMessage(`Solicitud exitosa`, 'Exito', 4000);
      this.router.navigate(['/ot/list-ot']);
    }

    // ENVIO INFORME TRABAJOS FINALIZADOS
    if (action.type === actaActions.informarTrabajosFinalizadosSuccess.type) {
      this.snackMessage.showMessage(`Envío exitoso`, 'Exito', 4000);
      this.router.navigate(['/ot/list-ot']);
    }

    // ENVIAR RESULTADO INGENIERIA
    if (
      action.type === ingenieriaActions.enviarResultadoIngenieriaSuccess.type
    ) {
      this.snackMessage.showMessage(
        `Resultado ingeniería enviado con éxito`,
        'Exito',
        4000
      );
      this.router.navigate(['/ot/list-ot']);
    }

    // APROBAR/RECHAZAR RESULTADO INGENIERIA
    if (
      action.type === ingenieriaActions.aprobarRechazarIngenieriaSuccess.type
    ) {
      this.snackMessage.showMessage(
        `Acción realizada correctamente`,
        'Exito',
        4000
      );
      this.router.navigate(['/ot/list-ot']);
    }
  }

  reloadTableOT(): void {
    location.reload();
    // CAMBIADO DEBIDO A QUE AHORA SE USA LA BOTONERA TAMBIÉN EN INFORMACIONES
    // this.otFacade.getBandejaOT('EN_EJECUCION');
    // this.otFacade.getBandejaOT('ABIERTAS');
    // this.otFacade.getBandejaOT('CERRADAS');
    // this.otFacade.getBandejaOT('ANULADAS');
    // this.otFacade.getBandejaOT('EN_TRAMITE');
  }
}
