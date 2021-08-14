import { Injectable, Inject } from '@angular/core';
import { SnackBarService } from '@utilsSIGO/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ErrMesaggesServices {
  constructor(private snackService: SnackBarService) {}

  SetErrMessage(errDescription: string, identify: string = ''): void {
    let message = '';

    if (errDescription === 'Sin resultados') {
      if (identify === 'Contratos') {
        message = 'El usuario no tiene contratos asignados';
      } else if (identify === 'Proyectos') {
        message = 'No existen proyectos';
      } else if (identify === 'Get Cubicaciones') {
        message = 'No existen cubicaciones';
      }
    } else {
      message = errDescription;
    }

    if (identify !== 'Listar OT') {
      this.snackService.showMessage(message, 'error');
    }
  }
}
