import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SnackMessageService } from './snack-message.service';
import * as authActions from '@storeOT/auth/auth.actions';
import * as perfilActions from '@storeOT/perfil/perfil.actions';

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
    private snackMessage: SnackMessageService
  ) {}

  errorHandler(action: ActionErr): void {
    this.snackMessage.showMessage(
      action.error.error.status.desc,
      'error',
      7000
    );
  }

  successHandler(action: ActionSuccess): void {
    if (action.type === authActions.loginSuccess.type) {
      this.router.navigate(['/login/perfil-select']);
    }

    if (action.type === authActions.Logout.type) {
      this.router.navigate(['/login/auth']);
    }

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
  }
}
