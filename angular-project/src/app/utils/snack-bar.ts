import { Injectable } from '@angular/core';
declare let Snackbar: object | any;

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor() {}

  showMessage(message: string, type: string): void {
    Snackbar.show({
      pos: 'bottom-right',
      text: message,
      backgroundColor: '#212121',
      actionText: type,
      actionTextColor: (color => {
        if (color === 'error') {
          return '#DB2828';
        }
        return '#2185D0';
      })(type),
      duration: 7000,
    });
  }
}
