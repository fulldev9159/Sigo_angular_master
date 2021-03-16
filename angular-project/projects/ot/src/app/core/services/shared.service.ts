import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Optional, Inject } from '@angular/core';
import { Router } from '@angular/router';
declare let Snackbar: object | any;

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private router: Router) {}

  showMessage(message: string, type: string): void {
    Snackbar.show({
      pos: 'bottom-right',
      text: message,
      backgroundColor: '#212121',
      actionText: 'OK',
      actionTextColor: ((color) => {
        if (color === 'error') {
          return '#DB2828';
        }
        return '#2185D0';
      })(type),
      duration: 7000,
    });
  }

  navegateTo(ruta: string): void {
    this.router.navigate([ruta]);
  }

  getErrorMessage(err: HttpErrorResponse): string {
    return typeof err.error.status === 'undefined'
      ? 'API caída'
      : `(HTTP code: ${err.status}) ${err.error.status.description}`;
  }
}
