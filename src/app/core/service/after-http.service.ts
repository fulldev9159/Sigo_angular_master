import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SnackMessageService } from './snack-message.service';
import * as authActions from '@storeOT/auth/auth.actions';
import * as perfilActions from '@storeOT/perfil/perfil.actions';
import * as usuarioActions from '@storeOT/usuario/usuario.actions';
import * as cubicacionActions from '@storeOT/cubicacion/cubicacion.actions';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';

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
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class AfterHttpService {
  constructor(
    private router: Router,
    private snackMessage: SnackMessageService,
    private authFacade: AuthFacade,
    private cubicacionFacade: CubicacionFacade
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
        6000
      );
      this.router.navigate(['/cubicacion/list-cub']);
    }

    // CLONAR CUBICACIÓN
    if (action.type === cubicacionActions.clonarCubicacionSuccess.type) {
      this.snackMessage.showMessage(
        `Clonación realizada con éxito. Nueva Cubicación ID:${action.response.data.cubicacion_id}`,
        'Exito',
        6000
      );
      this.cubicacionFacade.listarCubicaciones();
    }

    // ELIMINAR CUBICACIÓN
    if (action.type === cubicacionActions.eliminarCubicacionSuccess.type) {
      this.snackMessage.showMessage(
        `Cubicación ID:${action.response.data.cubicacion_id} eliminada con exito`,
        'Exito',
        6000
      );
      this.cubicacionFacade.listarCubicaciones();
    }

    // ELIMINAR SERVICIO CARRITO
    if (action.type === cubicacionActions.eliminarServicioCarritoSuccess.type) {
      this.snackMessage.showMessage(`Eliminación exitosa`, 'Exito', 6000);
    }
  }
}
