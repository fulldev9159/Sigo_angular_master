import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SnackMessageService } from './snack-message.service';
import * as authActions from '@storeOT/auth/auth.actions';
import * as perfilActions from '@storeOT/perfil/perfil.actions';
import { AuthFacade } from '@storeOT/auth/auth.facades';

interface ActionErr {
  error?: any;
  type: string;
}

interface ActionSuccess {
  response?: {
    data: any;
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
    private authFacade: AuthFacade
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
  }
}
