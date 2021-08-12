import { Injectable, Inject } from '@angular/core';
import { SnackBarService } from '@utilsSIGO/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ErrMesaggesServices {
  constructor(private snackService: SnackBarService) {}

  SetErrMessage(errDescription: string, identify: string = '') {
    let message = '';

    if (errDescription === 'Sin resultados') {
      if (identify === 'Contratos') {
        message = 'El usuario no tiene contratos asignados';
      } else if (identify === 'Proyectos') {
        message = 'No existe ningún proyecto en el sistema';
      }
    } else {
      message = errDescription;
    }
    this.snackService.showMessage(message, 'error');
  }
}
